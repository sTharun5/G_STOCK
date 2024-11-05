const express = require('express');
const router = express.Router();
const GroceryRequest = require('../models/GroceryRequest'); // Ensure this points to the correct model
const multer = require('multer');
const path = require('path');

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST route to handle grocery requests
router.post('/', upload.single('document'), async (req, res) => {
  try {
    const { groceryItems, quantities, units, receiveDate, requestType } = req.body;

    const newGroceryRequest = new GroceryRequest({
      groceryItems: Array.isArray(groceryItems) ? groceryItems : [groceryItems],
      quantities: Array.isArray(quantities) ? quantities.map(Number) : [Number(quantities)],
      units: Array.isArray(units) ? units : [units],
      receiveDate: receiveDate || null,
      requestType,
      document: req.file ? req.file.path : null,
    });

    await newGroceryRequest.save();
    res.status(201).json({ message: 'Grocery request submitted successfully', pdfUrl: req.file ? req.file.path : null });
  } catch (error) {
    console.error('Error submitting request:', error);
    res.status(500).json({ message: 'Failed to submit request', error });
  }
});

module.exports = router;
