const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyFirebaseToken, verifyAdmin } = require('../middleware/auth.middleware');

router.use(verifyFirebaseToken);

router.get('/profile', userController.getProfile);
router.patch('/profile', verifyFirebaseToken, userController.updateProfile);

router.get('/', verifyAdmin, userController.getAllUsers);
router.patch('/:id/role', verifyAdmin, userController.updateUserRole);
router.delete('/:id', verifyAdmin, userController.deleteUser);

module.exports = router;
