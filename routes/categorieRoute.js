const express = require('express');
const categorieController = require('../controllers/categorieController');
const { protect, checkManagerRole } = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.get('/list', categorieController.getCategorie);
router.get('/:id', categorieController.getCategorieByID);

// Protected routes (require authentication)
router.use(protect);

router.post('/create', checkManagerRole, asyncHandler(categorieController.createCategorie));
router.put('/update/:id', checkManagerRole, categorieController.updateCategorie);
router.delete('/delete/:id', checkManagerRole, categorieController.deleteCategorie);


module.exports = router;

