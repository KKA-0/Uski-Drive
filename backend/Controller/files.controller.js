const { DB, Table, S3, Bucket, FilesTable } = require("./../AWS.Config")
const {
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  DeleteItemCommand
} = require('@aws-sdk/client-dynamodb')

const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb')

const { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl, putObjectURL } = require('@aws-sdk/s3-request-presigner');

const { rvmFileURL } = require("./upload.controller")

exports.getUserFilesData = async (req, res) => {

  const params = {
    TableName: FilesTable,
    IndexName: 'user_id-folder_id-index', // The name of the GSI you created
    KeyConditionExpression: 'user_id = :userIdVal AND folder_id = :folderIdVal',
    ExpressionAttributeValues: {
      ':userIdVal': { S: req.params.user_id },
      ':folderIdVal': { S: req.body.folder_id }
    }
  };

  try {
    const command = new QueryCommand(params);
    const data = await DB.send(command);
    res.json(data.Items);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

exports.addFile = async (req, res) => {
  const { type, file_id, file_name, path, folder_id } = req.body
  const params = {
    TableName: FilesTable,
    Item: marshall({
      type, file_id, file_name, path: path, folder_id,
      user_id: req.params.user_id
    })
  }
  console.log(params.Item)
  try {
    await DB.send(new PutItemCommand(params))
    res.status(200).json({
      Message: "Added!",
    })
  }
  catch (err) {
    res.status(500).json({
      Error: "Something Went Wrong!",
      message: err
    })
  }
}

exports.removeFile = async (req, res) => {
  const user_id = req.params.user_id
  const { type, file_id, path } = req.body
  console.log(req.body)
  try {
    const S3Result = await rvmFileURL(path)
    if (S3Result && S3Result.$metadata && S3Result.$metadata.httpStatusCode === 204) {
      // File is Deleted from S3
      const params = {
        TableName: FilesTable,
        Item: marshall({
          file_id: file_id
        }),
      };
      await DB.send(new DeleteItemCommand(params))
      res.status(200).json({
        Message: "Deleted!",
      })
    }
    else {
      res.status(400).json({
        Message: "File Delete from S3 Failed"
      })
    }
  } catch (err) {
    res.status(500).json({
      Error: "Something Went Wrong!",
      message: err
    })
  }

}