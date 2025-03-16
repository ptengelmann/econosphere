// backend/routes/economicData.js

const express = require('express');
const axios = require('axios');
const router = express.Router();

/*
  This endpoint fetches the latest forex rates using the exchangerate.host API.
  Endpoint used: https://api.exchangerate.host/latest?base=USD
  
  The API returns data in the following format:
  {
    "motd": {...},
    "success": true,
    "base": "USD",
    "date": "2021-09-01",
    "rates": {
      "EUR": 0.85,
      "GBP": 0.72,
      ...
    }
  }
  
  We transform the "rates" object into an array of objects for easier use in the frontend chart.
*/

router.get('/forex', async (req, res) => {
  try {
    // Fetch forex data from exchangerate.host with USD as the base currency
    const response = await axios.get('https://api.exchangerate.host/latest?base=USD');
    
    // Extract the rates and date from the API response
    const { rates, date } = response.data;
    
    // Transform the rates object into an array of objects:
    // Each object will have the currency code, the exchange rate, and the date of the data.
    const forexData = Object.entries(rates).map(([currency, rate]) => ({
      currency,
      rate,
      date  // Same date for all rates since this is the latest snapshot
    }));
    
    res.json(forexData);
  } catch (error) {
    console.error('Error fetching forex data:', error);
    res.status(500).send('Error fetching forex data');
  }
});

module.exports = router;
