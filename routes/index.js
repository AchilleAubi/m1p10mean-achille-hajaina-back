const express = require('express');
const authentication = require('./authRoute');
const categorieRoutes = require('./categorieRoute');
const sousCategorieRoutes = require('./sousCategorieRoute');

const router = express.Router();

router.use('/auth', authentication);
router.use('/categorie', categorieRoutes);
router.use('/sousCategorie', sousCategorieRoutes);

module.exports = router;