const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tableSchema = new Schema(
    {
        tableNumber: Number,
        openTime: Number,
        closeTime: Number,
        waiter: { type: Schema.Types.ObjectId, ref: 'waiter' },
        order: Array,
        ready:Boolean,
        active: Boolean,
        total: Number
    }
)

const Table = mongoose.model('table', tableSchema)




module.exports = Table