const express = require('express');
const employeController = require('../controllers/employeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/list', employeController.getAlllEmploye);
router.get('/list/categori', employeController.getEmployeByIdCategori);
// router.get('/list/categori/:idCategorie', employeController.getEmployeByIdCategori);
// Protected routes (require authentication)
router.use(protect);

router.get('/commission/:idEmploye', employeController.commissionJouree);
router.post('/debaucher', employeController.debaucher);


module.exports = router;

