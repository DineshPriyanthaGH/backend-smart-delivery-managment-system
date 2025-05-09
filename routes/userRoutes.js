const express = require('express');
const { auth, db } = require('../firebaseConfig');  // Firebase connection
const admin = require('firebase-admin');  // Firebase Admin SDK
const router = express.Router();

// Signup Route (User Registration)
router.post('/signup', async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    // Create a new Firebase Authentication user
    const userRecord = await auth.createUser({ email, password });

    // Store user data in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      role,  // customer or driver
      createdAt: admin.firestore.FieldValue.serverTimestamp(),  // Timestamp from server
    });

    // Return the response with the user ID
    res.status(200).send({ message: 'User created successfully', userId: userRecord.uid });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Login Route (User Authentication) - Firebase Admin SDK can't directly handle password
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // The password verification and login process should be done client-side using Firebase Authentication SDK

    // Ideally, the client will use Firebase SDK to sign in the user and return the ID token.
    // On successful login, the client will send the ID token to the server for verification.

    res.status(200).send({ message: 'User login successful' });

  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
