const mongoose = require('mongoose');

const subStoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: String, required: true }, // Change to Date if necessary
});

module.exports = mongoose.model('SubStore', subStoreSchema);
