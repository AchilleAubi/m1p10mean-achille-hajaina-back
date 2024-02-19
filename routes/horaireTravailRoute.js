const express = require('express');
const HoraireTravailController = require('../controllers/horaireTravailController');
const { protect, checkManagerRole } = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');

const router = express.Router();


router.use(protect);

router.get('/list/user/:idEmploye', HoraireTravailController.getHoraireTravail);
router.post('/creat', HoraireTravailController.creatHoraireTravail);


module.exports = router;

