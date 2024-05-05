import React, { useEffect, useState, useRef } from 'react';
import './Dashboard.style.scss';
import UploadFile from "./../../widgets/uploadFile/uploadFile"
import useAuthentication from './../../hooks/private/useAuthentication';
import Folder from "./../../widgets/folder/folder"
import useData from "./../../hooks/data/useData"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { AddFolder } from "./../../features/folderSlice"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

const Dashboard = () => {
  const dispatch = useDispatch()
  const [LoadingCreateFolder, setLoadingCreateFolder] = useState(false)
  const [userDataFiles, setUserDataFiles] = useState([]);
  const [openFolderDialog, setOpenFolderDialog] = React.useState(false);
  const [openFileDialog, setOpenFileDialog] = React.useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State for storing image preview
  const [imagePreviewDialog, setImagePreviewDialog] = useState(false); // State for controlling image preview dialog
  const user_id = useSelector((state) => state.user.user_id) 
  const Addfolder = useRef(null);

  const isAuthenticated = useAuthentication();
  const userData = useData();

  useEffect(() => {
    if (userData) {
      setUserDataFiles(userData);
    }
  }, [userData]);

  if (!isAuthenticated) return null; // Render nothing if not authenticated

  const handleOpenFolderDialog = (e) => {
    e.preventDefault();
    setOpenFolderDialog(true);
  };

  const handleCloseFolderDialog = () => {
    setOpenFolderDialog(false);
  };

  const handleOpenFileDialog = (e) => {
    e.preventDefault();
    setOpenFileDialog(true);
  };

  const handleCloseFileDialog = () => {
    setOpenFileDialog(false);
  };

  // Function to handle image preview
  const handleImagePreview = (file) => {
    axios.patch('http://localhost:4000/upload', 
    {
      path: user_id+"/"+file.path,
      type: file.type
    } 
     )
    .then(function (response) {
      // handle success
      // console.log(response.data.fileURI);
      setImagePreview(response.data.fileURI);
      setImagePreviewDialog(true);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  };

  const handleCloseImagePreviewDialog = () => {
    // setImagePreview(null);
    setImagePreviewDialog(false);
  };

  const handleCreateFolder = () => {
    setLoadingCreateFolder(true)
    dispatch(AddFolder({user_id: user_id, folderName: Addfolder.current.value, path: user_id + "/" + Addfolder.current.value}))
  }

  return (
    <div className='dashboard_container'>
      <div className='sidebar_container'>
        <div className='sidebar_innner_container'>
          <button onClick={handleOpenFolderDialog}>Create Folder</button>
          <button onClick={handleOpenFileDialog}>Add File</button>
        </div>
      </div>
      <div className='files_container'>
      {/* <div className="path">Home/</div> */}
        {
          userDataFiles.map((item, key) => (
            <div onClick={() => handleImagePreview(item)}>
              <Folder key={key} type={item.type} file_id={item.file_id} />
            </div>
          ))
        }
      </div>
      <Dialog
        open={openFolderDialog}
        onClose={handleCloseFolderDialog}
      >
        <DialogTitle>Name the Folder you want to create</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={Addfolder}
            autoFocus
            required
            margin="dense"
            id="folderName"
            name="folderName"
            label="Folder Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        {
          (LoadingCreateFolder) ? 
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
          <LinearProgress color="success" />
        </Stack> : null
        }
        <DialogActions>
          <Button onClick={handleCloseFolderDialog}>Cancel</Button>
          <Button type="submit" onClick={handleCreateFolder}>Create</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openFileDialog}
        onClose={handleCloseFileDialog}
      >
        <DialogTitle>Add a new File</DialogTitle>
        <DialogContent>
        <DialogContentText>
            Leave Empty for Save with Same name as file.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="fileName"
            name="fileName"
            label="File Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <input type="file" id="fileInput" name="fileInput" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFileDialog}>Cancel</Button>
          <Button type="submit">Upload</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={imagePreviewDialog}
        onClose={handleCloseImagePreviewDialog}
      >
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
        <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImagePreviewDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
