const {Schema, model} = require('mongoose')

const ProductSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: "Category"},
    owner: {type: Schema.Types.ObjectId, ref: "Owner"},
    title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number,
    rating: [{type: Schema.Types.ObjectId, ref: "Review"}]
})

module.exports = model('Product', ProductSchema)