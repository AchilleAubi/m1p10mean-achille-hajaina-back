const SousCategorie = require('../models/sousCategorie');
const Categorie = require('../models/categorie');
const CategorieServices = require('../services/categorieServices');
const asyncHandler = require('express-async-handler');

const sousCategoriesController = {
    getCategorie: asyncHandler(async (req, res) => {
        try {
            const categories = await CategorieServices.getCategorie();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500);
            console.log(error);
            throw new error(error.message);
        }
    }),

    getCategorieByID: asyncHandler(async (req, res) => {
        try {
            const idCategorie = req.params.id;
            const categories = await CategorieServices.getCategorieByID(idCategorie);
            res.status(200).json(categories);
        } catch (error) {
            res.status(500);
            console.log(error);
            throw new error(error);
        }
    }),

    createCategorie: asyncHandler(async (req, res) => {
        try {
            let categories = "";
            for (let index = 0; index < req.body.length; index++) {
                categories = await CategorieServices.createCategorie(req.body[index]);
            }
            res.status(200).json("Inserted succes full");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })
}

module.exports = sousCategoriesController;