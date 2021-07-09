const mongoose = require('mongoose')
const Schema = mongoose.Schema

const daySchema = new Schema(
    {
       date: String,
       orderNo: Number
    }
)

const Day = mongoose.model('day', daySchema)



module.exports = Day