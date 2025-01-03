import React, { useEffect, useState, useRef } from 'react';
import './Dashboard.style.scss';
import useAuthentication from './../../hooks/private/useAuthentication';
import Folder from "./../../widgets/folder/folder"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { currentPath, AddFolder, AddFile, fetchData, fileId } from "./../../features/folderSlice"
import Navbar from "./../../components/header/Navbar.component"
import Option from "./../../widgets/option/option"

import { FolderPlus } from 'lucide-react';
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
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

import { unmarshall } from '@aws-sdk/util-dynamodb'

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Styled component for the upload button
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Dashboard = () => {
  const dispatch = useDispatch()
  const [LoadingCreateFolder, setLoadingCreateFolder] = useState(false)
  const [openFolderDialog, setOpenFolderDialog] = React.useState(false);
  const [openFileDialog, setOpenFileDialog] = React.useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviewDialog, setImagePreviewDialog] = useState(false);
  const [VideoPreview, setVideoPreview] = useState(null);
  const [VideoPreviewDialog, setVideoPreviewDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const user_id = useSelector((state) => state.user.user_id) 
  const file_id = useSelector((state) => state.folders.file_id) 
  const userDataFiles = useSelector((state) => state.folders.data) 
  const currentPos = useSelector((state) => state.folders.currentPos) 
  const Addfolder = useRef(null);
  const [displayOptionIndex, setDisplayOptionIndex] = useState(null);

  const isAuthenticated = useAuthentication();
  
  if (!isAuthenticated) return null;
  
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
    setSelectedFile(null);
  };

  const handleImagePreview = (file) => {
    console.log(file)
    if(file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg"){
      axios.patch(`${import.meta.env.VITE_APP_DOMAIN}/upload`, 
      {
        path: file.path
      } 
       )
      .then(function (response) {
        setImagePreview(response.data.fileURI);
        setImagePreviewDialog(true);
      })
      .catch(function (error) {
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
        setVideoPreview(response.data.fileURI);
        setVideoPreviewDialog(true);
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    else{
      console.log("Can't Preview or Open the File")
    }
  };

  const handleCloseImagePreviewDialog = () => {
    setImagePreviewDialog(false);
  };

  const handleCloseVideoPreviewDialog = () => {
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
      setSelectedFile(null);
      toast.info("File Upload Process is Started!", {
        position: "top-center"
      });
    } else {
      toast.error("Please select a file first", {
        position: "top-center"
      });
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
          <button className="buttons" onClick={handleOpenFolderDialog}>Create Folder</button>
          <button className="buttons" onClick={handleOpenFileDialog}>Add File</button>
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
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <FolderPlus className="text-blue-500" size={24} />
          Create New Folder
        </DialogTitle>
        <DialogContent>
          <Box sx={{ 
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 3,
            border: '2px dashed',
            borderColor: 'primary.main',
            borderRadius: 1,
            bgcolor: 'background.paper',
          }}>
            <DialogContentText sx={{ mb: 2 }}>
              Enter a name for your new folder. Use a descriptive name to help you organize your files better.
            </DialogContentText>
            <TextField
              inputRef={Addfolder}
              autoFocus
              required
              label="Folder Name"
              variant="outlined"
              fullWidth
              placeholder="My New Folder"
              InputProps={{
                sx: { 
                  borderRadius: 1,
                  '&:hover': {
                    borderColor: 'primary.main',
                  },
                }
              }}
            />
          </Box>
        </DialogContent>
        {LoadingCreateFolder && (
          <Box sx={{ px: 3 }}>
            <Stack sx={{ width: '100%', color: 'primary.main' }} spacing={2}>
              <LinearProgress color="primary" />
            </Stack>
          </Box>
        )}
        <DialogActions sx={{ 
          p: 2, 
          borderTop: 1, 
          borderColor: 'divider',
          gap: 1
        }}>
          <Button 
            onClick={handleCloseFolderDialog} 
            color="inherit"
            sx={{ px: 3 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreateFolder}
            variant="contained"
            startIcon={<FolderPlus size={20} />}
            sx={{ px: 3 }}
          >
            Create Folder
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Enhanced File Upload Dialog */}
      <Dialog
        open={openFileDialog}
        onClose={handleCloseFileDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>
          Upload File
        </DialogTitle>
        <DialogContent>
          <Box sx={{ 
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            p: 3,
            border: '2px dashed',
            borderColor: 'primary.main',
            borderRadius: 1,
            bgcolor: 'background.paper',
          }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
            >
              Choose File
              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            {selectedFile && (
              <Box sx={{ 
                width: '100%',
                p: 2,
                bgcolor: 'grey.50',
                borderRadius: 1,
                textAlign: 'center'
              }}>
                <DialogContentText>
                  Selected file: {selectedFile.name}
                </DialogContentText>
                <DialogContentText variant="body2" color="text.secondary">
                  Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </DialogContentText>
              </Box>
            )}
            {!selectedFile && (
              <DialogContentText sx={{ textAlign: 'center', color: 'text.secondary' }}>
                Drag and drop a file here or click the button above
              </DialogContentText>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button onClick={handleCloseFileDialog} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={uploadFile}
            variant="contained"
            disabled={!selectedFile}
          >
            Upload
          </Button>
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