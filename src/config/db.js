const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pxios99.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri);

const setupIndexes = async () => {
    try {
        await client.connect();
        const db = client.db('assignment-10');
        await db.collection('users').createIndex({ email: 1 }, { unique: true });
        console.log("Database indexes verified");
    } catch (error) {
        console.error("Error setting up indexes:", error);
    }
};

const connectDB = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        await setupIndexes();
        return client.db('assignment-10');
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

const getDB = () => client.db('assignment-10');

module.exports = { connectDB, client, getDB };

