const express = require('express');
const rendezVousController = require('../controllers/rendezVousController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes (require authentication)
router.use(protect);

router.post('/priseRendezVous', rendezVousController.priseRendezVous);
router.get('/list', rendezVousController.getAllRendezVous);
router.get('/list/:idEmploye', rendezVousController.getRendezVousByEmploye);
router.post('/valider', rendezVousController.validerRendezVous);

module.exports = router;

