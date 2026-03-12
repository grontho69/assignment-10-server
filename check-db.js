const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || "mongodb+srv://assignment-10:85Bocs514VlTUn6D@cluster0.pxios99.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function check() {
    try {
        await client.connect();
        const db = client.db('assignment-10');
        
        console.log("--- ISSUES ---");
        const issues = await db.collection('issues').find().limit(1).toArray();
        if (issues.length > 0) {
            console.log("Type of _id:", typeof issues[0]._id, issues[0]._id.constructor.name);
        }
        console.log(JSON.stringify(issues, null, 2));
        
        console.log("\n--- CONTRIBUTIONS ---");
        const contributions = await db.collection('contributions').find().limit(5).toArray();
        console.log(JSON.stringify(contributions, null, 2));
        
        if (issues.length > 0 && contributions.length > 0) {
            console.log("\n--- AGGREGATION TEST ---");
            const email = contributions[0].email || contributions[0].contributorEmail;
            console.log("Testing aggregation for email:", email);
            
            const results = await db.collection('contributions').aggregate([
                { $match: { $or: [{ email: email }, { contributorEmail: email }] } },
                {
                    $addFields: {
                        issueObjectId: {
                            $cond: {
                                if: { $and: [{ $ne: ["$issueId", null] }, { $ne: ["$issueId", ""] }] },
                                then: { $toObjectId: "$issueId" },
                                else: null
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: "issues",
                        localField: "issueObjectId",
                        foreignField: "_id",
                        as: "issueDetails"
                    }
                },
                { $unwind: { path: "$issueDetails", preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        _id: 1,
                        amount: 1,
                        date: "$createdAt",
                        issueTitle: { $ifNull: ["$issueDetails.title", "Unknown Issue"] },
                        category: { $ifNull: ["$issueDetails.category", "Unknown"] }
                    }
                }
            ]).toArray();
            console.log(JSON.stringify(results, null, 2));
        }

    } finally {
        await client.close();
    }
}

check();
