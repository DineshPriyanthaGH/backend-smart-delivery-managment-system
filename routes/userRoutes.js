const express = require('express');
const { auth, db } = require('../firebaseConfig');  // Firebase connection

const router = express.Router();

//signup route
router.post('/signup', async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    const userRecord = await auth.createUser({ email, password });
    
    // Add user info to Firestore
    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      role,  // customer or driver
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    res.status(200).send({ message: 'User created successfully', userId: userRecord.uid });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
