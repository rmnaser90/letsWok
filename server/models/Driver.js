const mongoose = require('mongoose')
const Schema = mongoose.Schema

const driverSchema = new Schema(
    {
        type: String,
        userName: String,
        password: String,
        name: String,
        mobile: String,
        averageTime: Number,
        fastestTime: Number,
        slowestTime: Number,
        orderHistory: [{ type: Schema.Types.ObjectId, ref: 'order' }],
        openOrders: [{ type: Schema.Types.ObjectId, ref: 'order' }],
        active:Boolean,
        isLoggedIn:Boolean,
        lastLogIn: Number
    }
)

const Driver = mongoose.model('driver', driverSchema)

module.exports = Driver