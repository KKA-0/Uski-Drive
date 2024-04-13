const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')

// AWS.config.update({
//   region: process.env.region,
//   accessKeyId: process.env.accessKeyId,
//   secretAccessKey: process.env.secretAccessKey
// });

const DB = new DynamoDBClient({region: process.env.region})
const Table = "uski-drive-table"

module.exports = {
  DB, Table
}