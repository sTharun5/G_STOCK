// controllers/groceryRequestController.js
const GroceryRequest = require('../models/GroceryRequest');

// Handler to create a grocery request
exports.createGroceryRequest = async (req, res) => {
  try {
    // Handling groceryItems, quantities, and units correctly as arrays
    const groceryItems = Array.isArray(req.body.groceryItems)
      ? req.body.groceryItems
      : [req.body.groceryItems];

    const quantities = Array.isArray(req.body.quantities)
      ? req.body.quantities
      : [req.body.quantities];

    const units = Array.isArray(req.body.units)
      ? req.body.units
      : [req.body.units];

    // Check if a file was uploaded for emergency requests
    const documentPath = req.file ? req.file.path : null;

    // Create a new grocery request
    const groceryRequest = new GroceryRequest({
      groceryItems,
      quantities: quantities.map(q => Number(q)),
      units,
      receiveDate: req.body.receiveDate || null,
      requestType: req.body.requestType,
      document: documentPath,
    });

    // Save the grocery request to the database
    await groceryRequest.save();

    res.status(201).json({ message: 'Grocery request submitted successfully', pdfUrl: documentPath });
  } catch (error) {
    console.error('Error submitting request:', error);
    res.status(500).json({ error: 'Failed to submit request' });
  }
};

// Handler to fetch all grocery requests
exports.getAllGroceryRequests = async (req, res) => {
  try {
    const requests = await GroceryRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch grocery requests', error });
  }
};
