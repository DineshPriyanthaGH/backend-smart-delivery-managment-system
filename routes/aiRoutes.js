const express = require('express');
const googleMaps = require('@google/maps');  
const router = express.Router();

// Initialize Google Maps API Client with the API key from .env
const googleMapsClient = googleMaps.createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,  // Fetch from .env file
});

// Predict Delivery Time Route
router.post('/predict-delivery-time', async (req, res) => {
  const { startLocation, endLocation } = req.body;  // Start and End location from request body

  try {
    const estimatedTime = await predictDeliveryTime(startLocation, endLocation);  
    res.status(200).send({ estimatedTime });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Function to predict delivery time using Google Maps API
async function predictDeliveryTime(start, end) {
  return new Promise((resolve, reject) => {
    googleMapsClient.distanceMatrix(
      {
        origins: [start],         
        destinations: [end],      
        mode: 'driving',          
        traffic_model: 'best_guess', 
      },
      (err, response) => {
        if (err) {
          reject('Error with Google Maps API: ' + err);  
        } else {
          const duration = response.json.rows[0].elements[0].duration_in_traffic.text;
          resolve(duration);  // e.g., '30 minutes'
        }
      }
    );
  });
}

module.exports = router;
