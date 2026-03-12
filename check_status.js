const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pxios99.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri);

async function check() {
    try {
        await client.connect();
        const db = client.db('assignment-10');
        const issues = await db.collection('issues').find({}, { projection: { title: 1, status: 1, email: 1 } }).toArray();
        console.log("Total Issues:", issues.length);
        console.log(JSON.stringify(issues, null, 2));
    } finally {
        await client.close();
    }
}
check();
