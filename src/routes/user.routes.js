const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyFirebaseToken, verifyAdmin } = require('../middleware/auth.middleware');

router.use(verifyFirebaseToken);

// This is accessible to any authenticated user
router.get('/profile', userController.getProfile);

// The following routes are admin-only
router.get('/', verifyAdmin, userController.getAllUsers);
router.patch('/:id/role', verifyAdmin, userController.updateUserRole);
router.delete('/:id', verifyAdmin, userController.deleteUser);

module.exports = router;
