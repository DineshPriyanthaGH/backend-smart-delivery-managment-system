const express = require('express');
const { db } = require('../firebaseConfig');  // Firebase connection

const router = express.Router();

router.post('/create-order', async (req, res) => {
    const { customerId, driverId, pickupLocation, deliveryLocation } = req.body;
    try {
      const orderRef = db.collection('deliveries').doc(); // Creating a new order document
      await orderRef.set({
        customerId,
        driverId,
        pickupLocation,
        deliveryLocation,
        status: 'Pending',  // Default order status
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      res.status(200).send({ message: 'Order created successfully', orderId: orderRef.id });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  router.put('/update-order/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      const orderRef = db.collection('deliveries').doc(orderId);
      await orderRef.update({ status }); // Update the status of the order
      res.status(200).send({ message: 'Order status updated' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
  
  module.exports = router;