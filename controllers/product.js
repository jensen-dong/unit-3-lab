const express = require('express');
const router = express.Router();
const { Product } = require('../models');

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
});

// Create a new product
router.post('/', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
});

// Get products by category
router.get('/category/:category', async (req, res) => {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
});

module.exports = router;

