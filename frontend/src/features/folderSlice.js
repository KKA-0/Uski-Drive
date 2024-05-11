import { createSlice, createAsyncThunk, current  } from '@reduxjs/toolkit'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    data: [],
    currentPos: ["/"],
    file_id: "empty"
}

export const fetchData = createAsyncThunk(
  'folder/fetchData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:4000/files/${data.user_id}`, {
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
        var NewPath = ""
        currentPosArray.map((item, index) => {
          if(index > 0 && index < currentPosArray.length - 1){
            console.log(item, index)
            NewPath = NewPath + item +"/" 
          }
        })
        const file_id = uuidv4()
        axios.post('http://localhost:4000/upload', {
          path: user_id + "/" + NewPath + path + "/",
          type: "folder"
        })
          .then(function (response) {
            axios.put(response.data.uploadURI)
            .then(function (response) {
                // console.log("Folder Created !");
                axios.post(`http://localhost:4000/files/${user_id}`,
                  {
                    user_id, file_name, path: NewPath+path + "/", type: "folder", "folder_id": folder_id, file_id
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
      console.log(action.payload.user_id)
      const { user_id, selectedFile, folder_id } = action.payload
      const formData = action.payload.selectedFile
      const file_id = uuidv4()
      console.log(formData.type)
      try {
        axios.post(`http://localhost:4000/upload`,
                    {
                      "path": user_id + "/" + formData.name,
                      "type": formData.type
                  }
                )
                  .then(function (response) {
                    // console.log(response.data.uploadURI)
                    axios.put(response.data.uploadURI, formData, { // Assuming API is a constant that holds your endpoint
                      headers: {
                        'Content-Type': formData.type
                      }
                    })
                    .then((response) => {
                      axios.post(`http://localhost:4000/files/${user_id}`,
                      {
                        "path": formData.name,
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
    }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchData.fulfilled, (state, action) => {
          state.data = action.payload;
        })
      // Handle other thunk states (pending, rejected) if needed...
    },
  })
  
  export const { currentPath, AddFolder, AddFile, fileId } = folderSlice.actions
  export default folderSlice.reducer