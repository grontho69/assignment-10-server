const express = require('express');
const router = express.Router();
const exportController = require('../controllers/export.controller');
const { verifyFirebaseToken } = require('../middleware/auth.middleware');

router.get('/csv', verifyFirebaseToken, exportController.exportCSV);

module.exports = router;
