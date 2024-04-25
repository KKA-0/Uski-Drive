const { DB, Table, S3, Bucket, FilesTable } = require("./../AWS.Config")
const { 
    GetItemCommand,
    PutItemCommand,
    DeleteItemCommand,
    ScanCommand,
    UpdateItemCommand
   } = require('@aws-sdk/client-dynamodb')
   
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb')

const { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl, putObjectURL } = require('@aws-sdk/s3-request-presigner');

exports.getUserFilesData = async (req, res) => {
    const params = {
        TableName: FilesTable,
        Key: marshall({
          "user_id": `${req.params.user_id}`
        }) 
      };
      await DB.send(new GetItemCommand(params))
      .then((response) => {
        res.status(200).json({
          data: unmarshall(response.Item),
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err.message,
        });
      });
}

exports.addFile = async (req, res) => {
    // Fetch Current User Files Data
      const params = {
        TableName: FilesTable,
        Key: marshall({
          "user_id": `${req.params.user_id}`
        }) 
      };
      try{
            
            await DB.send(new GetItemCommand(params))
            .then((response) => {
              // Add New File Object in Old Files Data
              var filesData = unmarshall(response.Item)
              filesData.files.push(req.body)
              // Update the New Files Data to Database
              const params = {
                TableName: FilesTable,
                Item: marshall(filesData)
              }
              // console.log(filesData)
              DB.send(new PutItemCommand(params))
              .then((response) => {
                res.status(201).json({
                  data: unmarshall(params.Item)
                });
              })
              .catch((err) => {
                res.status(400).json({
                  error: err.message,
                });
              })
            })

            // res.status(200).json({
            //   uploadURI: url
            // })
      }catch(err){
          res.status(400).json({
              Message: "Something went wrong!!"
            })
      }

}

exports.removeFile = async (req, res) => {
  // Fetch Current User Files Data
  const params = {
    TableName: FilesTable,
    Key: marshall({
      "user_id": `${req.params.user_id}`
    }) 
  };
  await DB.send(new GetItemCommand(params))
  .then(response => {
    // Remove File Object in Old Files Data
    var filesData = unmarshall(response.Item)
    filesData.files = filesData.files.filter(item => item.file_id !== req.body.file_id);

    // Update the New Files Data to Database
    const params = {
      TableName: FilesTable,
      Item: marshall(filesData)
    }
    // console.log(filesData)
    DB.send(new PutItemCommand(params))
    .then((response) => {
      res.status(201).json({
        data: unmarshall(params.Item)
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.message,
      });
    })

  }).catch(err => {
    res.status(400).json({
      error: err.message,
    });
  })
}