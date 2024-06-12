const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true }, // Store category as a string
    createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

