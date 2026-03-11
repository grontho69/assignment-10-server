const { Parser } = require('json2csv');
const issueService = require('../services/issue.service');

const exportCSV = async (req, res) => {
    try {
        const issues = await issueService.getAllIssues();
        const fields = ['title', 'category', 'amount', 'status', 'email', 'location'];
        const opts = { fields };
        const parser = new Parser(opts);
        const csv = parser.parse(issues);

        res.header('Content-Type', 'text/csv');
        res.attachment('eco-report.csv');
        return res.send(csv);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { exportCSV };
