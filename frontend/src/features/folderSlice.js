import { createSlice, createAsyncThunk, current  } from '@reduxjs/toolkit'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { unmarshall, marshall } from '@aws-sdk/util-dynamodb'
import { useDispatch } from 'react-redux';

const dispatch = useDispatch()

const initialState = {
    data: [],
    currentPos: ["/"],
    file_id: "empty",
    folder_id: "empty"
}

export const fetchData = createAsyncThunk(
  'folder/fetchData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_APP_DOMAIN}/files/${data.user_id}`, {
        folder_id: data.folder_id,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue('');
    }
  }
);

const folderSlice = createSlice({
    name: 'Folder',
    initialState,
    reducers: {
     currentPath: (state, action) => {
      const { path } = action.payload;
      const pathArr = path.split("/");
      state.currentPos = []; // Reset currentPos before filling it
      pathArr.forEach((item) => {
        state.currentPos.push(item); 
      });
     },      
     AddFolder: (state, action) => {
        const { user_id, file_name, path, folder_id } = action.payload
        const currentPosArray = current(state.currentPos)
        const FolderPath = currentPosArray.join("/") + file_name + "/"
        const file_id = uuidv4()
        console.log(FolderPath)

        axios.post(`${import.meta.env.VITE_APP_DOMAIN}/upload`, {
          path: FolderPath,
          type: "folder"
        })
          .then(function (response) {
            axios.put(response.data.uploadURI)
            .then(function (response) {
                // console.log("Folder Created !");
                axios.post(`${import.meta.env.VITE_APP_DOMAIN}/files/${user_id}`,
                  {
                    user_id, file_name, path: FolderPath, type: "folder", "folder_id": folder_id, file_id
                  }
                )
                  .then(function (response) {
                      console.log("Folder Created !");
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
            })
            .catch(function (error) {
                console.log(error);
            });
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    AddFile: (state, action) => {
      const { user_id, selectedFile, folder_id, currentPos } = action.payload
      const formData = action.payload.selectedFile
      const file_id = uuidv4()
      const FilePath = currentPos.join("/")
      try {
        axios.post(`${import.meta.env.VITE_APP_DOMAIN}/upload`,
                    {
                      "path": FilePath+formData.name,
                      "type": formData.type
                  }
                )
                  .then(function (response) {
                    // console.log(response.data.uploadURI)
                    axios.put(response.data.uploadURI, formData, {
                      headers: {
                        'Content-Type': formData.type
                      },
                      onUploadProgress: progressEvent => {
                        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        console.log(`Upload Progress: ${progress}%`);
                      }
                    })
                    
                    .then((response) => {
                      axios.post(`${import.meta.env.VITE_APP_DOMAIN}/files/${user_id}`,
                      {
                        "path": FilePath+formData.name,
                        "type": formData.type,
                        "file_name": formData.name,
                        "folder_id": folder_id,
                        file_id: file_id
                    }
                      )
                      .then((response) => {
                        console.log("File uploaded successfully");
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                  })
                  .catch(function (error) {
                      console.log(error);
                  });

        
      } catch (error) {
        console.log("File Upload Failed!!!")
      }
    },
    fileId: (state, action) => {
      state.file_id = action.payload.file_id
    },
    removeFileState: (state, action) => {
      console.warn(action.payload.file_id)
      const file_id = action.payload.file_id
      const files = current(state.data)
      const data = files.map(item => unmarshall(item));
      const result = data.filter(item => item.file_id !== file_id);
      const newData = result.map(item => marshall(item));
      state.data = newData
    },
    
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchData.fulfilled, (state, action) => {
          state.data = action.payload;
        })
      // Handle other thunk states (pending, rejected) if needed...
    },
  })
  
  export const { currentPath, AddFolder, AddFile, fileId, removeFileState } = folderSlice.actions
  export default folderSlice.reducer