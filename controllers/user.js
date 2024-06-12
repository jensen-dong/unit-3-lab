const express = require('express');
const router = express.Router();
const { User } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find().populate('favorites');
    res.json(users);
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).populate('favorites');
    res.json(user);
});

// Create a new user
router.post('/', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
});

// Add a product to user's favorites
router.post('/:id/favorites/:productId', async (req, res) => {
    const user = await User.findById(req.params.id);
    user.favorites.push(req.params.productId);
    await user.save();
    res.json(user);
});

// Remove a product from user's favorites
router.delete('/:id/favorites/:productId', async (req, res) => {
    const user = await User.findById(req.params.id);
    user.favorites.pull(req.params.productId);
    await user.save();
    res.json(user);
});

module.exports = router;
