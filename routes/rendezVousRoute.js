const express = require('express');
const rendezVousController = require('../controllers/rendezVousController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/list', rendezVousController.getAllRendezVous);
router.post('/priseRendezVous', rendezVousController.priseRendezVous);

// Protected routes (require authentication)
router.use(protect);


module.exports = router;

