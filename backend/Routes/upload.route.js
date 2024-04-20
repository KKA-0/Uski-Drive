const uploadController = require("./../Controller/upload.controller")
const express = require("express")
const router = express.Router()

router
    .route("/")
    .post(uploadController.getUploadURL)
    .get(uploadController.getFileURL)
    .delete(uploadController.rvmFileURL)

module.exports = router