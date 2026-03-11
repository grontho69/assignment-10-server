const express = require('express');
const router = express.Router();
const exportController = require('../controllers/export.controller');
const { verifyJWT } = require('../middleware/auth.middleware');

router.get('/csv', verifyJWT, exportController.exportCSV);

module.exports = router;
