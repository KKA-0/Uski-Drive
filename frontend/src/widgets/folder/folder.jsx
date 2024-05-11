import React from 'react';
import folder from "./folder.module.css";
import { CiFolderOn, CiImageOn } from "react-icons/ci";
import { FaRegFileZipper } from "react-icons/fa6";

const Folder = ({item}) => {
  // console.log(item.type)
  return (
    <>
      <div className={folder.FolderDiv}>
        {
          (item.type === "image/jpg" || item.type === "image/png" || item.type === "image/jpeg") ? <CiImageOn color='black' size={"5em"} /> :
          (item.type === "file/zip" || item.type === "file/rar") ? <FaRegFileZipper color='black' size={"5em"} /> :
          (item.type === "folder") ? <CiFolderOn color='black' size={"5em"} /> :
          null
        }
        {/* <CiFolderOn color='black' size={"5em"}/> */}
        <span style={{fontSize: "14px"}}>
          {item.file_name}
        </span>
      </div>
    </>
  );
}

export default Folder;
