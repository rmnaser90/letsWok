const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mealSchema = new Schema(
    {
        category: String,
        name: String,
        description: String,
        options: Array,
        ordered: Number,
        price: Number,
        quantity:Number
  
    }
)

const Meal = mongoose.model('meal', mealSchema)



module.exports = Meal