// controllers/subStoreController.js
const SubStore = require('../models/SubStore');

exports.getAllSubStores = async (req, res) => {
  try {
    const subStores = await SubStore.find();
    res.status(200).json(subStores);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sub-stores', error });
  }
};

exports.createSubStore = async (req, res) => {
  const { name, quantity, expiryDate } = req.body;

  const newSubStore = new SubStore({
    name,
    quantity,
    expiryDate,
  });

  try {
    await newSubStore.save();
    res.status(201).json({ message: 'Sub-store created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create sub-store', error });
  }
};
