const admin = require('firebase-admin');
require('dotenv').config();

// Attempt to initialize using environment variables for production flexibility
// or a service account file for local development.
try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } else {
        // Fallback to local file if it exists
        const serviceAccount = require('../../serviceKey.json');
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
    console.log('Firebase Admin initialized successfully');
} catch (error) {
    console.error('Firebase Admin initialization failed:', error.message);
}

module.exports = admin;
