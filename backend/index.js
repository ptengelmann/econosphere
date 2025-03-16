// backend/index.js
const express = require('express');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ msg: 'Server is running and MongoDB is connected!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
