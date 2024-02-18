const express = require('express');
const portFeuilleController = require('../controllers/portFeuilleController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();


// Protected routes (require authentication)
router.use(protect);

router.post('/achat', portFeuilleController.achat);
router.post('/depotSolde', portFeuilleController.depotSolde);
router.get('/solde/:idUser', portFeuilleController.getSoldeByIdUsuer);

module.exports = router;

