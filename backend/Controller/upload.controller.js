const { DB, Table, S3, Bucket } = require('./../AWS.Config')
const { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl, putObjectURL } = require('@aws-sdk/s3-request-presigner');

exports.getUploadURL = async (req, res) => {

    const { path, type } = req.body
    try{
        const command = new PutObjectCommand({
            Bucket: Bucket,
            Key: path,
            ContentType: type
          })
          const url = await getSignedUrl(S3, command)
          res.status(200).json({
            uploadURI: url
          })
    }catch(err){
        res.status(400).json({
            Message: "Something went wrong!!"
          })
    }
      
}

exports.getFileURL = async (req, res) => {

    const { path } = req.body
    try{
        const command = new GetObjectCommand({
            Bucket: Bucket,
            Key: path
          })
          const url = await getSignedUrl(S3, command)
          res.status(200).json({
            fileURI: url
          })
    }catch(err){
        res.status(400).json({
            Message: "Something went wrong!!"
          })
    }
}

exports.rvmFileURL = async (path) => {
    console.log(path)
    try{
        const command = new DeleteObjectCommand({
            Bucket: Bucket,
            Key: path
          })
          const response = await S3.send(command);
          return response
    }catch(err){
      console.log("Something went wrong!!") 
    }
}