const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issue.controller');
const { verifyJWT, verifyAdmin, verifyOrganization } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { createIssueSchema, updateIssueSchema } = require('../validators/issue.validator');

router.get('/', issueController.getAllIssues);
router.get('/recent-issues', issueController.getRecentIssues);
router.get('/my-issues', verifyJWT, issueController.getMyIssues);
router.get('/:id', verifyJWT, issueController.getIssueById);
router.post('/', verifyJWT, verifyOrganization, validate(createIssueSchema), issueController.createIssue);
router.put('/:id', verifyJWT, verifyOrganization, validate(updateIssueSchema), issueController.updateIssue);
router.delete('/:id', verifyJWT, verifyAdmin, issueController.deleteIssue);

module.exports = router;
