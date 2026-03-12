const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const getContributionsCollection = () => getDB().collection('contributions');

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
        email: data.email || data.contributorEmail,
        createdAt: new Date()
    };
    const result = await getContributionsCollection().insertOne(doc);
    return { _id: result.insertedId, ...doc };
};

const getMyContributions = async (email) => {
    // Escape special characters in email for regex
    const escapedEmail = email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const emailRegex = new RegExp(`^${escapedEmail}$`, 'i');

    return await getContributionsCollection().aggregate([
        { $match: { $or: [{ email: emailRegex }, { contributorEmail: emailRegex }] } },
        {
            $addFields: {
                issueObjectId: {
                    $cond: {
                        if: { 
                            $and: [
                                { $ne: ["$issueId", null] }, 
                                { $ne: ["$issueId", ""] },
                                { $eq: [{ $strLenCP: { $ifNull: ["$issueId", ""] } }, 24] }
                            ] 
                        },
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
};

module.exports = {
    getContributionsByIssueId,
    createContribution,
    getMyContributions
};
