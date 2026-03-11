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
        const result = await contributionService.createContribution(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getMyContributions = async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) return res.status(400).send({ error: "Email required" });
        const result = await contributionService.getMyContributions(email);
        res.send(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getContributionsByIssueId,
    createContribution,
    getMyContributions
};
