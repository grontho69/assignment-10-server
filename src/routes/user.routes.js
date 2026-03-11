const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyJWT, verifyAdmin } = require('../middleware/auth.middleware');

router.get('/', verifyJWT, verifyAdmin, userController.getAllUsers);
router.patch('/role', verifyJWT, verifyAdmin, userController.updateUserRole);

module.exports = router;
