import React from 'react'
import "./option.style.scss"
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios'
import { unmarshall } from "@aws-sdk/util-dynamodb"
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { removeFileState } from "./../../features/folderSlice"

const Option = ({display, item, setDisplay, index}) => {
  const items = unmarshall(item)
  const dispatch = useDispatch()
  async function handleDelete() {

      axios.delete(`${import.meta.env.VITE_APP_DOMAIN}/files/${items.user_id}`, {
        data: {
          path: items.path,
          file_id: items.file_id,
          type: items.type
        }
      })
      .then(response => {
        // Handle success
        toast.success("File Deleted!", {
          position: "top-center"
        });
        dispatch(removeFileState({file_id: items.file_id}))
        // console.log(response);
      })
      .catch(error => {
        // Handle error
        console.error('Error deleting file:', error);
      });    
      setDisplay(index);
  }

  return (<>
    {
        (display) ? (<Paper className='optionDiv' sx={{ width: 320, maxWidth: '100%' }}>
            <MenuList>
              <MenuItem>
                <ListItemText>View</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText>Download</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </MenuList>
          </Paper>)
          
          : ""
    }
    </>
  )
}

export default Option