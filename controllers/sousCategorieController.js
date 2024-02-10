const SousCategorieServices = require('../services/sousCategorieServices');
const asyncHandler = require('express-async-handler');

const sousCategorieController = {
    getSousCategorie: asyncHandler(async (req, res) => {
        try {
            const sousCategories = await SousCategorieServices.getSousCategorie();
            res.status(200).json(sousCategories);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    getSousCategorieByID: asyncHandler(async (req, res) => {
        try {
            const idSousCategorie = req.params.id;
            const sousCategories = await SousCategorieServices.getSousCategorieByID(idSousCategorie);
            res.status(200).json(sousCategories);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    createSousCategorie: asyncHandler(async (req, res) => {
        try {
            const io = req.app.get('io');
            for (let index = 0; index < req.body.length; index++) {
                const sousCategories = await SousCategorieServices.createSousCategorie(req.body[index]);
            }
            io.emit('newSousCategoryAdded', categories);
            res.status(200).json("Insert ok");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }),

    getSousCategorieByIDCategorie: asyncHandler(async (req, res) => {
        try {
            const sousCategories = await SousCategorieServices.getSousCategorieByIDCategorie(req.params.idCategorie);
            res.status(200).json(sousCategories);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })

}

module.exports = sousCategorieController;