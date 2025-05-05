const express = require('express');
const axios = require('axios');
const { googleMapsClient } = require('@google/maps');
const router = express.Router();

//Google Maps API Client
const googleMaps = googleMapsClient({
    key: process.env.GOOGLE_MAPS_API_KEY, 
});

//Predict Delivery Time 

router.post('/predict-delivery-time', async (req, res) => {
    const { startLocation, endLocation } = req.body;
    try {
        const estimatedTime = await predictDeliveryTime(startLocation, endLocation);
        res.status(200).send({ estimatedTime });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  async function predictDeliveryTime(start, end) {
    return new Promise((resolve, reject) => {
      googleMaps.distanceMatrix(
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
                const duration = response.json.rows[0].elements[0].duration.text;
                resolve(duration);  
              }
            }
          );
        });
      }
      
      module.exports = router;