const express = require('express');
const router = express.Router();
const contributionController = require('../controllers/contribution.controller');
const { verifyJWT } = require('../middleware/auth.middleware');

router.get('/', contributionController.getContributionsByIssueId);
router.post('/', verifyJWT, contributionController.createContribution);
router.get('/my', verifyJWT, contributionController.getMyContributions);

module.exports = router;
