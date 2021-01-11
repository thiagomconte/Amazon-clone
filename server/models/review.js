const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
    headline: String,
    body: String,
    rating: number,
    photo: String,
    productID: { type: Schema.Types.ObjectId, ref: "Product" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Review", ReviewSchema);
