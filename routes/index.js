const express = require('express');
const authentication = require('./authRoute');
const categorieRoutes = require('./categorieRoute');

const router = express.Router();

router.use('/auth', authentication);
router.use('/categorie', categorieRoutes);

module.exports = router;