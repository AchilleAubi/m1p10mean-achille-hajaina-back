const express = require('express');
const ServiceSalonController = require('../controllers/serviceSalonController');
const { protect, checkManagerRole } = require('../middleware/authMiddleware');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.get('/list', ServiceSalonController.getSousCategorie);
router.get('/top', ServiceSalonController.getTopSousCategorie);
router.get('/listByIDCategorie/:idCategorie', ServiceSalonController.getSousCategorieByIDCategorie);
router.post('/create', asyncHandler(ServiceSalonController.createSousCategorie));
router.get('/get/:id', ServiceSalonController.getSousCategorieByID);
router.post('/create/image', asyncHandler(ServiceSalonController.createImageService));

router.use(protect);

// router.put('/update/:id', checkManagerRole, ServiceSalonController);


module.exports = router;

