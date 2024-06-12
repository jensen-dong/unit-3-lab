const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');
const Favorite = require('../models/favorite');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.render('home', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('details', { product });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

//get categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.render('categories', { categories });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// get favorites
router.get('/favorites', async (req, res) => {
    try {
        const favorites = await Favorite.find().populate('product');
        res.render('favorites', { favorites });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// add product to favorites
router.post('/favorites', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
});

// add product to cart
router.post('/cart', async (req, res) => {
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

