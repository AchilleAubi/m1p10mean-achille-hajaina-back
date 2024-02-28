const express = require('express');
const jouranaleCaisseController = require('../controllers/journaleCaisseController')
const rendezVousController = require('../controllers/rendezVousController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/verifier', rendezVousController.verifierRendezVous);
router.post('/cancel', rendezVousController.cancelRendezVous);

// Protected routes (require authentication)
router.use(protect);

router.post('/priseRendezVous', rendezVousController.priseRendezVous);
router.get('/list', rendezVousController.getAllRendezVous);
router.get('/list/:idEmploye', rendezVousController.getRendezVousByEmploye);
router.post('/valider', rendezVousController.validerRendezVous);
router.post('/terminer', rendezVousController.terminerRendezVous);
router.post('/refuser', rendezVousController.refuserRendezVous);
router.get('/client/rdv/:User', rendezVousController.getRendezVousByUser);
router.get('/NonEffectuer/:idEmploye', rendezVousController.getRendezVousNonEffecteuer);
router.get('/Effectuer/:idEmploye', rendezVousController.getRendezVousEffecteuer);

router.get('/statCAjournalier', jouranaleCaisseController.getStatCAjournalier);
router.get('/statCAmensuel', jouranaleCaisseController.getStatCAmensuel);
router.get('/statBenefice', jouranaleCaisseController.getStatBeneficeMensuel);

router.get('/statRendezVousJournalier', rendezVousController.getStatRendezVousJournalier);
router.get('/statRendezVousMensuel', rendezVousController.getStatRendezVousMensuel);

module.exports = router;

