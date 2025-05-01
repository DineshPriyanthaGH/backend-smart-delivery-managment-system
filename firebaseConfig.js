const admin = require('firebase-admin');
require('dotenv').config();  // Load environment variables from .env

// Initialize Firebase Admin SDK using service account credentials
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.firestore();  // Access Firestore
const auth = admin.auth();      // Access Firebase Authentication

module.exports = { db, auth };
