const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema(
    {
        name: String,
        address: [String],
        mobile:String,
        orderHistory:[{type: Schema.Types.ObjectId, ref: 'order'}],
        openOrders:[{type: Schema.Types.ObjectId, ref: 'order'}],
        active: Boolean,
        date: Number,
    }
) 

const Client = mongoose.model('client',clientSchema)



module.exports = Client