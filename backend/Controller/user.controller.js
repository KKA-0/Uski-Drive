const { DB, Table } = require("./../AWS.Config")
var jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { 
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  ScanCommand,
  UpdateItemCommand
 } = require('@aws-sdk/client-dynamodb')
 
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb')

const TOKEN = (data) => {
  return jwt.sign(data, process.env.privateKey);
}
exports.signup = async (req, res) => {
        var parameters = {
            TableName: Table,
            FilterExpression: "email = :email",
            ExpressionAttributeValues: marshall({ ":email": `${req.body.email}` })
        };        
        
        await DB.send(new ScanCommand(parameters))
        .then((response) => {
          console.log(response.Items[0])
          if(!response.Items[0]){
            // IF User does NOT Exist Return the User Info and Create Token
                const params = {
                    TableName: Table,
                    Item: marshall({
                      "id": uuidv4(),
                      "name": req.body.name,
                      "email": req.body.email
                  })
                  }
                  DB.send(new PutItemCommand(params))
                  .then((response) => {
                    var token = TOKEN(params.Item)
                    // Response user Created
                    res.status(201).json({
                      user: unmarshall(params.Item),
                      token: token
                    });
                  })
                  .catch((err) => {
                    console.log(err)
                  })
          }else{
              // IF User Exist Return the User Info and Create Token
              var token = TOKEN(response.Items[0])
              // Login user
              res.status(200).json({
                user: unmarshall(response.Items[0]),
                token: token
              });
            }
        })
        .catch((err) => { 
          console.log(err)
        })
}

exports.getUser = async (req, res) => {
    const params = {
      TableName: Table,
      Key: marshall({
        "id": `${req.params.id}`
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


// exports.checkToken = async (req, res, next) => {
//   try {
//     let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }
//   else if(req.cookies.jwt){
//     token = req.cookies.jwt
//   }
//     var decoded = jwt.verify(token, process.env.privateKey);
//     // Check IF user Still Exist in Database
//     var params = {
//       TableName: Table,
//       Key: {
//         "id": `${decoded.id}`
//       }
//     };
//     await DB.get(params, function (err, data) {
//       console.log(data.Item)
//       res.status(200).json({
//         data: data.Item
//       });
//     });

//     // res.status(202).json({
//     //   decoded
//     // })
//   } catch(err) {
//     // err
//     res.status(401).json({
//       error: 'The user belonging to this token does no longer exist.'
//     })
//   }
// }