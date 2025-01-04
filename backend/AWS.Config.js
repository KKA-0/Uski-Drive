const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const AWSconfig = {
  region: process.env.region,
  credentials: {
    region: process.env.region
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