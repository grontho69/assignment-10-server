const admin = require('firebase-admin');
require('dotenv').config();

try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } else {
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
