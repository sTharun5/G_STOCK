const express = require('express');
const router = express.Router();
const SubStore = require('../models/SubStore'); // Adjust the path if necessary

// POST route to add an item to the subStore
router.post('/', async (req, res) => {
  try {
    const { name, quantity, expiryDate } = req.body;

    // Create a new item
    const newItem = new SubStore({
      name,
      quantity,
      expiryDate,
    });

    // Save the item to the database
    const savedItem = await newItem.save();

    res.status(201).json(savedItem); // Respond with the saved item
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Failed to add item.', error }); // Send error message
  }
});

// GET route to fetch all items in the subStore
router.get('/', async (req, res) => {
  try {
    const items = await SubStore.find();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Failed to fetch items.', error });
  }
});

module.exports = router;
