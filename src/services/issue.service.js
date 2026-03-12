const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');
const { sendNotification } = require('../utils/notification.util');

const getIssuesCollection = () => getDB().collection('issues');

const getAllIssues = async () => {
    return await getIssuesCollection().find().toArray();
};

const getIssueById = async (id) => {
    return await getIssuesCollection().findOne({ _id: new ObjectId(id) });
};

const createIssue = async (data) => {
    const doc = {
        ...data,
        createdAt: new Date(),
        status: data.status || 'Pending'
    };
    const result = await getIssuesCollection().insertOne(doc);
    sendNotification('REPORT_SUBMITTED', {
        message: `New report submitted: ${doc.title}`,
        payload: { id: result.insertedId, title: doc.title }
    });
    return { _id: result.insertedId, ...doc };
};

const getMyIssues = async (email) => {
    return await getIssuesCollection().find({ email: email }).toArray();
};

const updateIssue = async (id, data) => {
    const filter = { _id: new ObjectId(id) };
    const updatedDoc = {
        $set: {
            title: data.title,
            category: data.category,
            description: data.description,
            amount: data.amount,
            status: data.status,
        }
    };
    const result = await getIssuesCollection().updateOne(filter, updatedDoc);
    if (data.status === 'Approved') {
        sendNotification('REPORT_APPROVED', {
            message: `Report approved: ${data.title}`,
            payload: { id, title: data.title }
        });
    } else if (data.status === 'Rejected') {
        sendNotification('REPORT_REJECTED', {
            message: `Report rejected: ${data.title}`,
            payload: { id, title: data.title }
        });
    }

    return result;
};

const deleteIssue = async (id) => {
    return await getIssuesCollection().deleteOne({ _id: new ObjectId(id) });
};

const getRecentIssues = async (limit = 6) => {
    return await getIssuesCollection().find().sort({ createdAt: -1 }).limit(limit).toArray();
};

const approveIssue = async (id) => {
    const filter = { _id: new ObjectId(id) };
    const issue = await getIssueById(id);
    const result = await getIssuesCollection().updateOne(filter, { $set: { status: 'Approved' } });
    sendNotification('REPORT_APPROVED', {
        message: `Report approved: ${issue.title}`,
        payload: { id, title: issue.title }
    });
    return result;
};

module.exports = {
    getAllIssues,
    getIssueById,
    createIssue,
    getMyIssues,
    updateIssue,
    deleteIssue,
    getRecentIssues,
    approveIssue
};
