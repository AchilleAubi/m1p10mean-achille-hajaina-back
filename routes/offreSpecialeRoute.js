const express = require('express');
const OffreSpecialeController = require('../controllers/offreSpecialeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', OffreSpecialeController.createOffreSpeciale);
router.get('/all', OffreSpecialeController.getOffreSpeciale);
router.post('/update', OffreSpecialeController.updateOffreSpeciale);

// Protected routes (require authentication)
router.use(protect);


module.exports = router;

