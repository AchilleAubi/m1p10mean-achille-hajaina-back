const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/login', authController.login);
router.post('/register', authController.register);

router.post('/getUserAdmin', authController.getUserAdmin);

router.use(protect);

router.post('/createAdmin', authController.createAdmin);
router.post('/logout', authController.logout);

module.exports = router;