const express = require('express');
const router = express.Router();
const { Category } = require('../models');

// Get all categories
router.get('/', async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

// Get a single category by ID
router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.json(category);
});

// Create a new category
router.post('/', async (req, res) => {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.json(newCategory);
});

// Update a category by ID
router.put('/:id', async (req, res) => {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCategory);
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
});

module.exports = router;
