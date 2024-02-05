const Categorie = require('../models/categorie')
const asyncHandler = require('express-async-handler')

const categorieController = {
    getCategorie: asyncHandler(async (req, res) => {
        try {
            const categories = await Categorie.find({});
            res.status(200).json(categories);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    getCategorieByID: asyncHandler(async (req, res) => {
        try {
            const { id } = req.params;
            const categorie = await Categorie.findById(id);
            res.status(200).json(categorie);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    createCategorie: asyncHandler(async (req, res) => {
        const name = req.body.name;
        try {
            const existingCategorie = await Categorie.findOne({ name });
            if (existingCategorie) {
                res.status(400).json({ error: 'Categorie is already exist' });
            } else {
                const categorie = await Categorie.create(req.body);
                res.status(200).json(categorie);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }),

    updateCategorie: asyncHandler(async (req, res) => {
        try {
            const { id } = req.params;
            const categorie = await Categorie.findByIdAndUpdate(id, req.body);
            // we cannot find any product in database
            if (!categorie) {
                res.status(404);
                throw new Error(`cannot find any product with ID ${id}`);
            }
            const updatedCategirue = await Categorie.findById(id);
            res.status(200).json(updatedCategirue);

        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    }),

    deleteCategorie: asyncHandler(async (req, res) => {
        try {
            const { id } = req.params;
            const categorie = await Categorie.findByIdAndDelete(id);
            if (!categorie) {
                res.status(404);
                throw new Error(`cannot find any categorie with ID ${id}`);
            }
            res.status(200).json(categorie);

        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    })
}

module.exports = categorieController;