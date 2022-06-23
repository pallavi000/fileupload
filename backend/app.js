const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const user = require('./Router/user')
const withdraw = require('./Router/withdraw')
const file = require('./Router/file')
const fileUpload = require('express-fileupload')

require('dotenv').config()

try {
    mongoose.connect(process.env.DB_URL,{useNewUrlParser: true, useUnifiedTopology: true,})
} catch(err) {
    console.log(err.message);
}


app.use(cors())
app.use(express.json({limit:'50mb'}))
app.use(fileUpload())

app.use('/api/user',user)
app.use('/api/withdraw',withdraw)
app.use('/api/file',file)

const PORT= process.env.PORT || 5000
app.listen(PORT)

