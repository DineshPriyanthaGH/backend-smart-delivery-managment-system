const express = require('express');
const { db, auth } = require('./firebaseConfig'); // Firebase connection
const dotenv = require('dotenv'); 
const userRoutes = require('./routes/userRoutes');  // Import User Routes
const deliveryRoutes = require('./routes/deliveryRoutes');  // Import Delivery
const aiRoutes = require('./routes/aiRoutes'); // Import AI Routes 

dotenv.config();  // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/users', userRoutes); // Use User Routes
app.use('/api/deliveries', deliveryRoutes);


app.get('/', (req, res) => {
  res.send('Delivery Management API is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});