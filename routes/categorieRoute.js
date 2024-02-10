const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const { protect, checkManagerRole } = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.get('/list', categoriesController.getCategorie);
router.get('/:id', categoriesController.getCategorieByID);

router.post('/create', asyncHandler(categoriesController.createCategorie));
router.put('/update/:id', categoriesController.updateCategorie);
router.delete('/delete/:id', categoriesController.deleteCategorie);

// Protected routes (require authentication)
router.use(protect);

// router.post('/create', checkManagerRole, asyncHandler(categoriesController.createCategorie));
// router.put('/update/:id', checkManagerRole, categoriesController.updateCategorie);
// router.delete('/delete/:id', checkManagerRole, categoriesController.deleteCategorie);


module.exports = router;

