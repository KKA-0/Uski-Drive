import React, { useEffect, useState, useRef } from 'react';
import './Dashboard.style.scss';
import useAuthentication from './../../hooks/private/useAuthentication';
import Folder from "./../../widgets/folder/folder"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { currentPath, AddFolder, AddFile, fetchData, fileId } from "./../../features/folderSlice"
import Navbar from "./../../components/header/Navbar.component"
import Option from "./../../widgets/option/option"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import ButtonGroup from '@mui/material/ButtonGroup';
import { PiDotsThreeCircleFill } from "react-icons/pi";

import { unmarshall } from '@aws-sdk/util-dynamodb'

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const dispatch = useDispatch()
  const [LoadingCreateFolder, setLoadingCreateFolder] = useState(false)
  const [openFolderDialog, setOpenFolderDialog] = React.useState(false);
  const [openFileDialog, setOpenFileDialog] = React.useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State for storing image preview
  const [imagePreviewDialog, setImagePreviewDialog] = useState(false); // State for controlling image preview dialog
  const [VideoPreview, setVideoPreview] = useState(null); // State for storing video preview
  const [VideoPreviewDialog, setVideoPreviewDialog] = useState(false); // State for controlling video preview dialog
  const [selectedFile, setSelectedFile] = useState(null);
  const user_id = useSelector((state) => state.user.user_id) 
  const file_id = useSelector((state) => state.folders.file_id) 
  const userDataFiles = useSelector((state) => state.folders.data) 
  const currentPos = useSelector((state) => state.folders.currentPos) 
  const Addfolder = useRef(null);
  const [displayOptionIndex, setDisplayOptionIndex] = useState(null);

  const isAuthenticated = useAuthentication();
  
  if (!isAuthenticated) return null; // Render nothing if not authenticated
  
  const handleOptionClick = (key) => {
    setDisplayOptionIndex(prevIndex => (prevIndex === key ? null : key));
  };

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
    console.log(file)
    if(file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg"){
      axios.patch(`${import.meta.env.VITE_APP_DOMAIN}/upload`, 
      {
        path: file.path
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
    }else if(file.type == "folder"){
      console.log("Its a Folder", file)
      dispatch(currentPath({path: file.path}))
      dispatch(fileId({file_id: file.file_id}))
      dispatch(fetchData({"user_id": user_id, folder_id: file.file_id}))

    }else if(file.type === "video/mp4"){
      axios.patch(`${import.meta.env.VITE_APP_DOMAIN}/upload`, 
      {
        path: file.path
      } 
       )
      .then(function (response) {
        // handle success
        // console.log(response.data.fileURI);
        setVideoPreview(response.data.fileURI);
        setVideoPreviewDialog(true);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }
    else{
      console.log("Can't Preview or Open the File")
    }
  };

  const handleCloseImagePreviewDialog = () => {
    // setImagePreview(null);
    setImagePreviewDialog(false);
  };

  const handleCloseVideoPreviewDialog = () => {
    // setImagePreview(null);
    setVideoPreviewDialog(false);
  };

  const handleCreateFolder = () => {
    setOpenFolderDialog(false);
    toast.success("Folder Created!", {
      position: "top-center"
    });
    dispatch(AddFolder({user_id: user_id, file_name: Addfolder.current.value, path: Addfolder.current.value, folder_id: file_id}))
  }


  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);
      dispatch(AddFile({user_id, selectedFile: selectedFile, folder_id: file_id, currentPos}))
      setOpenFileDialog(false);
      toast.info("File Upload Process is Started!", {
        position: "top-center"
      });
    } else {
      console.log('No file selected');
      // Handle no file selected here
    }
  };

  const Home = () => {
    dispatch(currentPath({path: "/"}))
    dispatch(fetchData({"user_id": user_id, folder_id: "empty"}))
    dispatch(fileId({file_id: "empty"}))
  }

  const ChangeUserPath = (index) => {
    const FolderPath = currentPosArray.slice(0, index + 1).join("/")
    console.log(FolderPath)
    // dispatch(currentPath({path: path}))
    // dispatch(fetchData({"user_id": user_id, folder_id: "empty"}))
    // dispatch(fileId({file_id: "empty"}))
  }

  const setDisplay = key => {
    handleOptionClick(key)
  }

  return (<>
    <ToastContainer />
    <Navbar/>
    <div className='dashboard_container'>
      <div className='sidebar_container'>
        <div className='sidebar_innner_container'>
          <button class="buttons" onClick={handleOpenFolderDialog}>Create Folder</button>
          <button class="buttons" onClick={handleOpenFileDialog}>Add File</button>
        </div>
      </div>
      <div className=''>
      <div className="path">
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        <Button className="home" style={{cursor: "pointer"}} onClick={Home}>Home</Button>
        {
          currentPos.map((path, index) => (
            (index > 0) ? (
              <Button style={{cursor: "pointer"}} onClick={() => ChangeUserPath(index)} key={index}>{path}</Button>
            ) : (
              null
            )
          ))
        }
        </ButtonGroup>  
      </div>

        <div className='files_container'>
        {
          userDataFiles.map((item, key) => (
            <React.Fragment key={key}>
              <div className="folderDiv">
                <div onClick={() => handleImagePreview(unmarshall(item))}>
                  <Folder item={unmarshall(item)} />
                </div>
                <PiDotsThreeCircleFill
                  className='OptionsDiv'
                  onClick={() => handleOptionClick(key)}
                  size={"2em"}
                />
                {displayOptionIndex === key && <Option display={true} setDisplay={setDisplay} item={item} index={key}/>}
              </div>
            </React.Fragment>
          ))
        }
        </div>
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
            Select The File to Upload
          </DialogContentText>
          {/* <TextField
            autoFocus
            required
            margin="dense"
            id="fileName"
            name="fileName"
            label="File Name"
            type="text"
            fullWidth
            variant="standard"
          /> */}
          <input type="file" id="fileInput" name="fileInput" onChange={handleFileChange}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFileDialog}>Cancel</Button>
          <Button type="submit" onClick={uploadFile}>Upload</Button>
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

      <Dialog
        open={VideoPreviewDialog}
        onClose={handleCloseVideoPreviewDialog}
      >
        <DialogTitle>Video Preview</DialogTitle>
        <DialogContent>
          <video width="400" controls>
            <source src={VideoPreview} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseVideoPreviewDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
};

export default Dashboard;
