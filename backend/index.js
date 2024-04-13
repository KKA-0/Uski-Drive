require('dotenv').config()
const serverless = require("serverless-http");
const express = require("express");
const app = express();
var bodyParser = require('body-parser')
const userRoute = require("./Routes/user.route")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/user', userRoute)
app.use('/', (req, res) => {
    res.send("Beep... Beep... 🤖")
})

// app.listen(400, () => console.log("Beep... Beep... 🤖"))
module.exports.handler = serverless(app);
