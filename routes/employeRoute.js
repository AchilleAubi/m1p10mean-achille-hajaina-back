const express = require('express');
const employeController = require('../controllers/employeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/list', employeController.getAlllEmploye);

// Protected routes (require authentication)
router.use(protect);


module.exports = router;

