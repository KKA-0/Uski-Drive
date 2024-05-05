var jwt = require('jsonwebtoken');
const { unmarshall, marshall } = require('@aws-sdk/util-dynamodb')
const { DB, Table } = require("./../AWS.Config")
const { 
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  ScanCommand,
  UpdateItemCommand
 } = require('@aws-sdk/client-dynamodb')


exports.Auth = async (req, res) => {
    try {
          let token;
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith('Bearer')
        ) {
          token = req.headers.authorization.split(' ')[1];
        }
        else if(req.cookies.jwt){
          token = req.cookies.jwt 
        }
          var decoded = jwt.verify(token, process.env.privateKey);
        //   Check IF user Still Exist in Database  
          var params = {
            TableName: Table,
            Key: marshall({
              "id": `${decoded.id}`
            })
          };
          await DB.send(new GetItemCommand(params))
          .then((response) => {
            const responseData = unmarshall(response.Item)
            res.status(200).json({
              data: {
                id: responseData.id,
                name: responseData.name,
                email: responseData.email
              },
            });
          })
          .catch((err) => {
            res.status(400).json({
              error: err.message,
            });
          });
    
        } catch(err) {
          // err
          res.status(401).json({
            error: 'The user belonging to this token does no longer exist.'
          })
        }
  }