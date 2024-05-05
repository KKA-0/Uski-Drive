import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    data: []
}

const folderSlice = createSlice({
    name: 'Folder',
    initialState,
    reducers: {
    AddFolder: (state, action) => {
        const { user_id, folderName, path } = action.payload
        axios.post('http://localhost:4000/upload', {
            user_id, folderName, path: path + "/", type: "folder"
          })
          .then(function (response) {
            axios.put(response.data.uploadURI)
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
    },
    },
  })
  
  export const { AddFolder } = folderSlice.actions
  export default folderSlice.reducer