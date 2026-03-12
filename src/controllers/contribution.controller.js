const contributionService = require('../services/contribution.service');

const getContributionsByIssueId = async (req, res) => {
    try {
        const { issueId } = req.query;
        if (!issueId) return res.send([]);
        const result = await contributionService.getContributionsByIssueId(issueId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createContribution = async (req, res) => {
    try {
        const contributionData = {
            ...req.body,
            contributorEmail: req.user.email,
            contributorName: req.user.name
        };
        const result = await contributionService.createContribution(contributionData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getMyContributions = async (req, res) => {
    try {
        const email = req.user.email;
        const result = await contributionService.getMyContributions(email);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getContributionsByIssueId,
    createContribution,
    getMyContributions
};
