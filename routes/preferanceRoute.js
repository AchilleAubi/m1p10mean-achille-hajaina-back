const express = require('express');
const PreferanceController = require('../controllers/preferanceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', PreferanceController.creatPreferance);
router.post('/update', PreferanceController.updatePreferance);
router.post('/delete', PreferanceController.deletePreferance);
router.get('/liste/:Client', PreferanceController.getPreferance);

module.exports = router;

