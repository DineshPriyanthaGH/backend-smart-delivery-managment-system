const express = require('express');
const axios = require('axios');
const { googleMapsClient } = require('@google/maps');
const router = express.Router();

//Google Maps API Client
const googleMaps = googleMapsClient({
    key: process.env.GOOGLE_MAPS_API_KEY, 
});