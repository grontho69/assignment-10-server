const issueService = require('../services/issue.service');

const getAllIssues = async (req, res) => {
    try {
        const issues = await issueService.getAllIssues();
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getIssueById = async (req, res) => {
    try {
        const result = await issueService.getIssueById(req.params.id);
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createIssue = async (req, res) => {
    try {
        const result = await issueService.createIssue(req.body);
        res.status(201).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getMyIssues = async (req, res) => {
    try {
        const result = await issueService.getMyIssues(req.user.email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateIssue = async (req, res) => {
    try {
        const result = await issueService.updateIssue(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteIssue = async (req, res) => {
    try {
        const result = await issueService.deleteIssue(req.params.id);
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getRecentIssues = async (req, res) => {
    try {
        const result = await issueService.getRecentIssues();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const approveIssue = async (req, res) => {
    try {
        const result = await issueService.approveIssue(req.params.id);
        res.status(200).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
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
