require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const subStoreRoutes = require('./routes/subStoreRoutes'); // Adjust the path as necessary
const groceryRequestRoutes = require('./routes/groceryRequests'); // Ensure you have this route

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/groceryRequests', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/subStore', subStoreRoutes);
app.use('/api/groceryRequests', groceryRequestRoutes); // Add this line

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
