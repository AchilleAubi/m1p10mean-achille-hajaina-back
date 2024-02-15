const express = require('express');
const rendezVousController = require('../controllers/rendezVousController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes (require authentication)
router.post('/priseRendezVous', rendezVousController.priseRendezVous);
router.use(protect);

router.get('/list', rendezVousController.getAllRendezVous);
router.get('/listRendezVous/employe/:id ', rendezVousController.getRendezVousByEmploye);

module.exports = router;

