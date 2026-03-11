const { MongoClient, ServerApiVersion } = require('mongodb');
const admin = require("firebase-admin");
const serviceAccount = require("../../serviceKey.json");
require('dotenv').config();

// Firebase Admin initialization
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// MongoDB client setup
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pxios99.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectDB = async () => {
    try {
        // await client.connect();
        console.log("Connected to MongoDB");
        return client.db('assignment-10');
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = { connectDB, client, admin };
