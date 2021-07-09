const mongoose = require('mongoose')
const Schema = mongoose.Schema

const waiterSchema = new Schema(
    {
        type: String,
        userName: String,
        password: String,
        name: String,
        mobile: String,
        orderHistory: [{ type: Schema.Types.ObjectId, ref: 'order' }],
        active:Boolean,
        isLoggedIn:Boolean,
        lastLogIn: Number
    }
)

const Waiter = mongoose.model('waiter', waiterSchema)



module.exports = Waiter