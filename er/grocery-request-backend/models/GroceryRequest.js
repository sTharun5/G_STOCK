// models/GroceryRequest.js
const mongoose = require('mongoose');

const groceryRequestSchema = new mongoose.Schema({
  groceryItems: { type: [String], required: true },
  quantities: { type: [Number], required: true },
  units: { type: [String], required: true },
  receiveDate: { type: String },
  requestType: { type: String, required: true },
  document: { type: String },
});

module.exports = mongoose.model('GroceryRequest', groceryRequestSchema);
