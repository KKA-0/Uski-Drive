import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux"

const useData = () => {
    const [userData, setuserData] = useState("");
    const user_id = useSelector((state) => state.user.user_id)
    // console.log("http://localhost:4000/files/"+user_id)
    const files = "http://localhost:4000/files/"+user_id
    useEffect(() => {

      const userData = () => {
        axios.get(files)
          .then(function (response) {
            // handle success
            // console.log(response.data.data.files);
            setuserData(response.data.data.files)
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
      }
      userData()
    }, [user_id])
    

  return userData;
}

export default useData;