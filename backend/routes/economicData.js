// backend/routes/economicData.js

const express = require('express');
const axios = require('axios');
const router = express.Router();

/*
  Endpoint: GET /api/economic/calendar
  Description: Fetches the economic calendar from Trading Economics.
*/
router.get('/calendar', async (req, res) => {
  try {
    const tradingEconKey = process.env.TRADING_ECON_API_KEY;
    if (!tradingEconKey) {
      console.error("TRADING_ECON_API_KEY not defined in .env");
      return res.status(500).json({ error: "Server configuration error: Trading Economics API key missing" });
    }

    const calendarUrl = `https://api.tradingeconomics.com/calendar?c=${tradingEconKey}`;
    const response = await axios.get(calendarUrl);
    console.log("Trading Economics Calendar Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching economic calendar:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/*
  Endpoint: GET /api/economic/rates
  Description: Fetches forex market data from Trading Economics.
*/
router.get('/rates', async (req, res) => {
  try {
    const tradingEconKey = process.env.TRADING_ECON_API_KEY;
    if (!tradingEconKey) {
      console.error("TRADING_ECON_API_KEY not defined in .env");
      return res.status(500).json({ error: "Server configuration error: Trading Economics API key missing" });
    }

    // Corrected endpoint for forex data
    const ratesUrl = `https://api.tradingeconomics.com/markets/currency?c=${tradingEconKey}`;
    const response = await axios.get(ratesUrl);
    
    console.log("Trading Economics Forex Rates Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching forex rates:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/*
  Endpoint: GET /api/economic/commodities
  Description: Fetches commodities market data from Trading Economics.
*/
router.get('/commodities', async (req, res) => {
  try {
    const tradingEconKey = process.env.TRADING_ECON_API_KEY;
    if (!tradingEconKey) {
      console.error("TRADING_ECON_API_KEY not defined in .env");
      return res.status(500).json({ error: "Server configuration error: Trading Economics API key missing" });
    }

    // Corrected endpoint for commodity market data
    const commoditiesUrl = `https://api.tradingeconomics.com/markets/commodity?c=${tradingEconKey}`;
    const response = await axios.get(commoditiesUrl);
    
    console.log("Trading Economics Commodities Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching commodities data:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
