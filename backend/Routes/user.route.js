const userController = require("./../Controller/user.controller")
const express = require("express")
const router = express.Router()

router
    .route("/")
    .post(userController.signup)
router
    .route("/:id")
    .get(userController.getUser)

module.exports = router