const express = require("express")
const router = express.Router()
const filesController = require("./../Controller/files.controller")

router
    .route("/:user_id")
    .patch(filesController.getUserFilesData)
    .post(filesController.addFile)
    .delete(filesController.removeFile)


module.exports = router