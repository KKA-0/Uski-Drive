const authController = require("./../Controller/auth.controller")
const express = require("express")
const router = express.Router()

router
    .route("/token")    
    .get(authController.Auth)

module.exports = router