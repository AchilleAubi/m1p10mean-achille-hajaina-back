const Categorie = require('../models/categorie')
const SousCategorie = require('../models/sousCategorie')
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
            const idCategorie = req.params.id;
            const categorie = await Categorie.findById(idCategorie);
            if (categorie) {
                const sousCategories = await SousCategorie.find({ categorie: '65c730596392166c1553976c' });
                console.log('sousCategories', sousCategories);
                categorie.sousCategories = sousCategories;
            }
            res.status(200).json(categorie);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    createCategorie: asyncHandler(async (req, res) => {
        const name = req.body.name;
        try {
            const io = req.app.get('io');
            const existingCategorie = await Categorie.findOne({ name });
            if (existingCategorie) {
                return res.status(400).json({ error: 'Category already exists' });
            } else {
                const categorie = await Categorie.create(req.body);
                io.emit('newCategoryAdded', categorie);
                return res.status(200).json(categorie);
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
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