const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema(
    {
        orderNumber: Number,
        client: { type: Schema.Types.ObjectId, ref: 'client' },
        addressNo: Number,
        openTime: Number,
        readyTime: Number,
        deliveryTime: Number,
        waiter: { type: Schema.Types.ObjectId, ref: 'waiter' },
        driver: { type: Schema.Types.ObjectId, ref: 'driver' },
        order: Array,
        ready: Boolean,
        active: Boolean,
        discount:Number,
        total: Number,
        comment: String
    }
)

const Order = mongoose.model('order', orderSchema)




module.exports = Order