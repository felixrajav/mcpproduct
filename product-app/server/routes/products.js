const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyToken, isAdmin, isAdminOrPlanner } = require('../middleware/auth');

// Get all products
router.get('/', verifyToken, async (req, res) => {
    try {
        const products = await Product.find().populate('createdBy', 'username');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get product by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('createdBy', 'username');
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create product (Admin or Planner)
router.post('/', verifyToken, isAdminOrPlanner, async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        // Validate input
        if (!name || !description || price === undefined || !category) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        const product = new Product({
            name,
            description,
            price,
            category,
            stock: stock || 0,
            createdBy: req.user.id
        });

        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update product (Admin or Planner)
router.put('/:id', verifyToken, isAdminOrPlanner, async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const updateData = {};

        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (price !== undefined) updateData.price = price;
        if (category) updateData.category = category;
        if (stock !== undefined) updateData.stock = stock;

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete product (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
