const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const AWSconfig = {
  region: process.env.region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
}

const S3 = new S3Client(AWSconfig)
const DB = new DynamoDBClient(AWSconfig)
const Table = process.env.Table
const Bucket = process.env.Bucket
const FilesTable = process.env.FilesTable

module.exports = {
  DB, Table, S3, Bucket, FilesTable
}