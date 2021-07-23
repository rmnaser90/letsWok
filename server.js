const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const api = require('./server/routes/api')
const adminApi = require('./server/routes/adminAPI')
const mongoose = require('mongoose')
const socket = require('socket.io')

mongoose.set("useUnifiedTopology", true )
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: true })

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/user/', api)
app.use('/admin/', adminApi)


const PORT = process.env.PORT
const server = app.listen(PORT, function () {
    console.log ("up and running on port: "+PORT)
})

const io = socket(server)

io.on('connection', function (socket) {
    socket.on('newOrder', function () {
        io.sockets.emit('newOrder')
    })
    socket.on('setOrderReady', function (driverId) {
        io.sockets.emit('setOrderReady', driverId)
    })
})
