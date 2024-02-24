const express = require('express');
const PaimentController = require('../controllers/paimentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();


// Protected routes (require authentication)
router.use(protect);

router.post('/solde/rest', PaimentController.getMontantRest);
router.post('/payer', PaimentController.paiment);

module.exports = router;

