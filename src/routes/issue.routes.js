const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issue.controller');
const { verifyFirebaseToken, verifyAdmin, verifyOrganization } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { createIssueSchema, updateIssueSchema } = require('../validators/issue.validator');

router.get('/', issueController.getAllIssues);
router.get('/recent-issues', issueController.getRecentIssues);
router.get('/my-issues', verifyFirebaseToken, issueController.getMyIssues);
router.get('/:id', verifyFirebaseToken, issueController.getIssueById);
router.post('/', verifyFirebaseToken, verifyOrganization, validate(createIssueSchema), issueController.createIssue);
router.put('/:id', verifyFirebaseToken, verifyOrganization, validate(updateIssueSchema), issueController.updateIssue);
router.delete('/:id', verifyFirebaseToken, verifyAdmin, issueController.deleteIssue);
router.patch('/:id/approve', verifyFirebaseToken, verifyAdmin, issueController.approveIssue);

module.exports = router;
