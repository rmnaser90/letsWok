const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema(
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

const Admin = mongoose.model('admin', adminSchema)



module.exports = Admin