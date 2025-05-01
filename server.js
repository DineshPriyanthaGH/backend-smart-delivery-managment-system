const express = require('express');
const { db, auth } = require('./firebaseConfig');  // Firebase connection
const dotenv = require('dotenv');  // Load environment variables from .env

dotenv.config();  // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());  // Middleware to parse incoming JSON requests

app.get('/', (req, res) => {
  res.send('Delivery Management API is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
