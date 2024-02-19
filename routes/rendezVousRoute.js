const express = require('express');
const rendezVousController = require('../controllers/rendezVousController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/verifier', rendezVousController.verifierRendezVous);

// Protected routes (require authentication)
router.use(protect);

router.post('/priseRendezVous', rendezVousController.priseRendezVous);
router.get('/list', rendezVousController.getAllRendezVous);
router.get('/list/:idEmploye', rendezVousController.getRendezVousByEmploye);
router.post('/valider', rendezVousController.validerRendezVous);
router.post('/refuser', rendezVousController.refuserRendezVous);

module.exports = router;

