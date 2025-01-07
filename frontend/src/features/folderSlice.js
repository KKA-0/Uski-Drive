import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { unmarshall, marshall } from '@aws-sdk/util-dynamodb';

const initialState = {
  data: [],
  currentPos: ["/"],
  file_id: "empty",
  folder_id: "empty",
  uploads: {}, // Tracks uploads with progress
};

export const fetchData = createAsyncThunk(
  'folder/fetchData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_DOMAIN}/files/${data.user_id}`,
        { folder_id: data.folder_id }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Failed to fetch data');
    }
  }
);

const apiPost = async (url, payload) => {
  try {
    const response = await axios.post(url, payload);
    return response.data;
  } catch (error) {
    console.error(`API POST Error: ${error}`);
    throw error;
  }
};

const apiPut = async (url, payload, config = {}) => {
  try {
    const response = await axios.put(url, payload, config);
    return response.data;
  } catch (error) {
    console.error(`API PUT Error: ${error}`);
    throw error;
  }
};

export const addNewfolder = createAsyncThunk(
  'folder/addNewfolder',
  async ({ user_id, file_name, folder_id, currentPos }, { rejectWithValue }) => {
    try {
      const FolderPath = `${user_id}${currentPos.join("/")}/${file_name}/`;
      const file_id = uuidv4();

      const uploadResponse = await apiPost(`${import.meta.env.VITE_APP_DOMAIN}/upload`, {
        path: FolderPath,
        type: "folder",
      });

      await apiPut(uploadResponse.uploadURI);

      await apiPost(`${import.meta.env.VITE_APP_DOMAIN}/files/${user_id}`, {
        user_id,
        file_name,
        path: FolderPath,
        type: "folder",
        folder_id,
        file_id,
      });

      return { FolderPath, file_id };
    } catch (error) {
      console.error("AddFolder Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const addNewfile = createAsyncThunk(
  'folder/addNewfile',
  async (data, { rejectWithValue, dispatch }) => {
    const { user_id, folder_id, currentPos, selectedFile } = data;
    const file_id = uuidv4();
    const FilePath = `${currentPos.join("/")}/${selectedFile.name}`;

    try {
      dispatch(updateUploadProgress({ file_id, "file_name": selectedFile.name, progress: 0 }));

      const uploadResponse = await apiPost(`${import.meta.env.VITE_APP_DOMAIN}/upload`, {
        path: FilePath,
        type: selectedFile.type,
      });

      await apiPut(uploadResponse.uploadURI, selectedFile, {
        headers: { 'Content-Type': selectedFile.type },
        onUploadProgress: ({ loaded, total }) => {
          const progress = Math.round((loaded / total) * 100);
          dispatch(updateUploadProgress({ file_id, "file_name": selectedFile.name, progress }));
          console.log(`Upload Progress: ${progress}%`);
        },
      });

      await apiPost(`${import.meta.env.VITE_APP_DOMAIN}/files/${user_id}`, {
        path: FilePath,
        type: selectedFile.type,
        file_name: selectedFile.name,
        folder_id,
        file_id,
      });

      dispatch(updateUploadProgress({ file_id, progress: 100 }));
      return { FilePath, file_id };
    } catch (error) {
      console.error("AddFile Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

const folderSlice = createSlice({
  name: 'Folder',
  initialState,
  reducers: {
    currentPath: (state, action) => {
      const { path } = action.payload;
      state.currentPos = path.split("/").filter(Boolean); // Filter to remove empty strings
    },
    updateUploadProgress: (state, action) => {
      const { file_id, file_name, progress } = action.payload;
      console.log(action.payload)
      state.uploads[file_id] = { file_name, progress };
    },
    fileId: (state, action) => {
      state.file_id = action.payload.file_id;
    },
    removeFileState: (state, action) => {
      const file_id = action.payload.file_id;
      const unmarshalledData = current(state.data).map(item => unmarshall(item));
      const filteredData = unmarshalledData.filter(item => item.file_id !== file_id);
      state.data = filteredData.map(item => marshall(item));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(addNewfolder.fulfilled, (state, action) => {
      console.log("Folder Created!", action.payload);
    });
    builder.addCase(addNewfile.fulfilled, (state, action) => {
      console.log("File uploaded successfully", action.payload);
    });
  },
});

export const { currentPath, updateUploadProgress, fileId, removeFileState } = folderSlice.actions;
export default folderSlice.reducer;
