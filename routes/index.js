const express = require('express');
const authentication = require('./authRoute');
const categorieRoutes = require('./categorieRoute');
const ServiceSalonRoute = require('./serviceSalonRoute');

const router = express.Router();

router.use('/auth', authentication);
router.use('/categorie', categorieRoutes);
router.use('/service', ServiceSalonRoute);

module.exports = router;