import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux" 
import { userData } from '../../features/userSlice';
import { useNavigate } from "react-router-dom"
// import {useData} from "./../data/useData"
import { fetchData } from "./../../features/folderSlice"

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = document.cookie.split('=')[1];
        if (token) {
          const axiosHead = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/auth/token`, axiosHead);
          // console.log(response);
          dispatch(userData({"user_id": response.data.data.id}))
          dispatch(fetchData({"user_id": response.data.data.id, folder_id: "empty"}))
          setIsAuthenticated(true);
        } else {
          navigate('/login'); // Redirect to login if not authenticated
          setIsAuthenticated(false);
        }
      } catch (error) {
        navigate('/login'); // Redirect to login if not authenticated
        console.log(error);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  return isAuthenticated;
};

export default useAuthentication;
