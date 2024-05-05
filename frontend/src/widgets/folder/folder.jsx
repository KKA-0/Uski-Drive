import React from 'react';
import folder from "./folder.module.css";
import { CiFolderOn, CiImageOn } from "react-icons/ci";
import { FaRegFileZipper } from "react-icons/fa6";

const Folder = ({ type, file_id }) => {
  // console.log(item)
  return (
    <>
      <div className={folder.FolderDiv}>
        {
          (type === "image/jpg" || type === "image/png") ? <CiImageOn color='black' size={"5em"} /> :
          (type === "file/zip" || type === "file/rar") ? <FaRegFileZipper color='black' size={"5em"} /> :
          (type === "folder") ? <CiFolderOn color='black' size={"5em"} /> :
          null
        }
        {/* <CiFolderOn color='black' size={"5em"}/> */}
        <span style={{fontSize: "14px"}}>
          {file_id}
        </span>
      </div>
    </>
  );
}

export default Folder;
