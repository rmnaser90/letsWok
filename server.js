require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const api = require('./server/routes/api')
const mongoose = require('mongoose')

mongoose.set("useUnifiedTopology", true )
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: true })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)



const port = process.env.PORT
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})