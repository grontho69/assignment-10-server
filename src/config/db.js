const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pxios99.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectDB = async () => {
    try {
        await client.connect();
        console.log("Database connection established");
        await client.db("admin").command({ ping: 1 });
        return client.db('assignment-10');
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

module.exports = { connectDB, client };
