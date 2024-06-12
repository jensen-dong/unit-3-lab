const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    productID: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)