const express = require('express');
const { db, auth } = require('./firebaseConfig'); // Firebase connection
const dotenv = require('dotenv'); 
const userRoutes = require('./routes/userRoutes');  // Import User Routes
const deliveryRoutes = require('./routes/deliveryRoutes');  // Import Delivery Routes
const aiRoutes = require('./routes/aiRoutes'); // Import AI Routes 

dotenv.config();  // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());  // Middleware to parse incoming JSON requests

// Add this to your `server.js` file for testing Firebase connection
app.get('/test-firebase', async (req, res) => {
  try {
    const users = await auth.listUsers(100); // List the first 100 users
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Use the routes
app.use('/api/users', userRoutes); // Use User Routes
app.use('/api/deliveries', deliveryRoutes); // Use Delivery Routes
app.use('/api/ai', aiRoutes); // Use AI Routes

app.get('/', (req, res) => {
  res.send('Delivery Management API is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
