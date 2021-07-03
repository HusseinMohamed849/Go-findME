const request = require('request')
const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const User = require('./models/user')
const Post = require('./models/post')
const Trusted = require('./models/trustedPeople')
const path = require('path')
const userrouter = require('./routers/user')
const postrouter = require('./routers/post')
const trustedrouter = require('./routers/trustedPeolple')
const auth = require('./middleware/auth')
const validator = require('validator')
// const {sendWelcomeEmail, sendCancelationEmail} = require('./emails/account')
const bodyParser = require("body-parser");



const port = process.env.PORT 
const app = express()

app.use(cors())
// const viewPath = path.join(__dirname, '../public/css')
// const stylePath = path.join(__dirname, '../public/html')
// app.use(express.static(viewPath))
// app.use(express.static(stylePath))

app.use(express.json())
app.use(userrouter)
app.use(postrouter)
app.use(trustedrouter)
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')))

app.listen(port , ()=>{
    console.log(`The server connection on port ${port}`)
})

