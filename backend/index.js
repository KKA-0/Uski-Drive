require('dotenv').config()
const serverless = require("serverless-http");
const express = require("express");
var cors = require('cors')
const app = express();
app.use(cors())
var bodyParser = require('body-parser')
const port = 4000
var morgan = require('morgan')

const userRoute = require("./Routes/user.route")
const uploadRoute = require("./Routes/upload.route")
const filesRoute = require("./Routes/files.route")
const authRoute = require("./Routes/auth.route")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use('/files', filesRoute)
app.use('/upload', uploadRoute)
app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/', (req, res) => {
    res.send("Beep... Beep... 🤖")
})

// app.listen(port, () => console.log("Beep... Beep... 🤖", {port}))
module.exports.handler = serverless(app);