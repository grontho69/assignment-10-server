const { client } = require('../config/db');
const { ObjectId } = require('mongodb');

const getContributionsCollection = () => client.db('assignment-10').collection('contributions');

const getContributionsByIssueId = async (issueId) => {
    return await getContributionsCollection()
        .find({ issueId })
        .sort({ createdAt: -1 })
        .toArray();
};

const createContribution = async (data) => {
    const doc = {
        ...data,
        amount: Number(data.amount),
        createdAt: new Date()
    };
    const result = await getContributionsCollection().insertOne(doc);
    return { _id: result.insertedId, ...doc };
};

const getMyContributions = async (email) => {
    return await getContributionsCollection().aggregate([
        { $match: { contributorEmail: email } },
        {
            $addFields: {
                issueObjectId: { $toObjectId: "$issueId" }
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
        { $unwind: "$issueDetails" },
        {
            $project: {
                _id: 1,
                amount: 1,
                date: "$createdAt",
                issueTitle: "$issueDetails.title",
                category: "$issueDetails.category"
            }
        }
    ]).toArray();
};

module.exports = {
    getContributionsByIssueId,
    createContribution,
    getMyContributions
};
