const express = require("express")
const router = express.Router()
const filesController = require("./../Controller/files.controller")

router
    .route("/:user_id")
    .get(filesController.getUserFilesData)
    .post(filesController.addFile)
    .delete(filesController.removeFile)


module.exports = router