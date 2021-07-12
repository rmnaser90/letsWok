const mongoose = require('mongoose')
const Schema = mongoose.Schema

const optionSchema = new Schema(
    {
        name:String,
        price:Number,
        category:String
    }
)

const Option = mongoose.model('option', optionSchema)


module.exports = Option