const express = require('express');
const router = express.Router();
const contributionController = require('../controllers/contribution.controller');
const { verifyFirebaseToken } = require('../middleware/auth.middleware');

router.get('/', contributionController.getContributionsByIssueId);
router.post('/', verifyFirebaseToken, contributionController.createContribution);
router.get('/my', verifyFirebaseToken, contributionController.getMyContributions);

module.exports = router;
