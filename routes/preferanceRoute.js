const express = require('express');
const PreferanceController = require('../controllers/preferanceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/employe/:idUser', PreferanceController.getPreferanceByIdEmploye);
router.get('/service/:idUser', PreferanceController.getPreferanceByIdServices);
router.post('/create/employe', PreferanceController.creatPreferanceByEmploye);
router.post('/create/service', PreferanceController.creatPreferanceByServices);

// Protected routes (require authentication)
router.use(protect);


module.exports = router;

