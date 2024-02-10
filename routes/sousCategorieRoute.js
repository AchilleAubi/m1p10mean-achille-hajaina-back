const express = require('express');
const sousCategorieController = require('../controllers/sousCategorieController');
const { protect, checkManagerRole } = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.get('/list', sousCategorieController.getSousCategorie);
router.get('/:id', sousCategorieController.getSousCategorieByID);
router.get('/listByIDCategorie/:idCategorie', sousCategorieController.getSousCategorieByIDCategorie);

router.post('/create', asyncHandler(sousCategorieController.createSousCategorie));

router.use(protect);

// router.put('/update/:id', checkManagerRole, sousCategorieController);


module.exports = router;

