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
            const io = req.app.get('io');
            for (let index = 0; index < req.body.length; index++) {
                categories = await CategorieServices.createCategorie(req.body[index]);
            }
            io.emit('newCategoryAdded', categories);
            res.status(200).json("Inserted succes full");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }),

    updateCategorie: asyncHandler(async (req, res) => {
        try {
            const { id } = req.params;
            const io = req.app.get('io');
            const categorie = await Categorie.findByIdAndUpdate(id, req.body);
            if (!categorie) {
                res.status(404);
                throw new Error(`cannot find any product with ID ${id}`);
            }
            const updatedCategirue = await Categorie.findById(id);
            io.emit('newCategoryUpdated', categorie);
            res.status(200).json(updatedCategirue);

        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    }),

    deleteCategorie: asyncHandler(async (req, res) => {
        try {
            const { id } = req.params;
            const io = req.app.get('io');
            const categorie = await Categorie.findByIdAndDelete(id);
            if (!categorie) {
                res.status(404);
                throw new Error(`cannot find any categorie with ID ${id}`);
            }
            io.emit('newCategoryDeleted', categorie);
            res.status(200).json(categorie);

        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    })
}

module.exports = sousCategoriesController;