const mongoose = require('mongoose')
const Schema = mongoose.Schema

const kitchenSchema = new Schema(
    {
        type: String,
        userName: String,
        password: String,
        name: String,
        mobile: String,
        active:Boolean,
        isLoggedIn:Boolean,
        lastLogIn: Number
    }
)

const Kitchen = mongoose.model('kitchen', kitchenSchema)



module.exports = Kitchen