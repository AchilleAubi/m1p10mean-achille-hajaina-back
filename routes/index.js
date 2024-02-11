const express = require('express');
const authentication = require('./authRoute');
const categorieRoutes = require('./categorieRoute');
const ServiceSalonRoute = require('./serviceSalonRoute');
const PorteFeuilleRoute = require('./porteFeuilleRoute');
const RendezVousRoute = require('./rendezVousRoute');

const router = express.Router();

router.use('/auth', authentication);
router.use('/categorie', categorieRoutes);
router.use('/service', ServiceSalonRoute);
router.use('/porteFeuille', PorteFeuilleRoute);
router.use('/rendezVous', RendezVousRoute);

module.exports = router;