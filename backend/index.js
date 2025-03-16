// backend/index.js

const express = require('express');
const connectDB = require('./db');
const economicDataRouter = require('./routes/economicData');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Test route to verify backend and MongoDB connection
app.get('/api/test', (req, res) => {
  res.json({ msg: 'Server is running and MongoDB is connected!' });
});

// Economic Data Route: All endpoints under /api/economic will be handled by economicDataRouter
app.use('/api/economic', economicDataRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
