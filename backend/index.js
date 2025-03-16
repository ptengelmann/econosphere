// backend/index.js

const express = require('express');
const connectDB = require('./db');
const economicDataRouter = require('./routes/economicData');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log("TRADING_ECON_API_KEY:", process.env.TRADING_ECON_API_KEY); // Verify credentials are loaded

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Test route to confirm server and DB connection
app.get('/api/test', (req, res) => {
  res.json({ msg: 'Server is running and MongoDB is connected!' });
});

// Use the Trading Economics routes under /api/economic
app.use('/api/economic', economicDataRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
