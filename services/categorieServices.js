const SousCategorie = require('../models/sousCategorie');
const Categorie = require('../models/categorie');
const SousCategorieServices = require('../services/sousCategorieServices');

const categorieServices = {
    async getCategorie() {
        try {
            const formattedCategories = {
                categories: []
            };
            const categories = await Categorie.find({}).populate('sousCategories');
            for (let index = 0; index < categories.length; index++) {
                const sousCategorie = await SousCategorieServices.getSousCategorieByIDCategorie(categories[index]._id);
                categories[index].sousCategories = sousCategorie;
                formattedCategories.categories.push(categories[index]);
            }
            return formattedCategories;
        } catch (error) {
            throw new error(error.message);
        }
    },

    async getCategorieByID(id) {
        try {
            const categorie = await Categorie.findById(id).populate('sousCategories');
            const sousCategorie = await SousCategorieServices.getSousCategorieByIDCategorie(id);
            if (!categorie) {
                throw new Error('Categorie not found');
            }
            const formattedCategories = {
                categories: [{
                    name: categorie.name,
                    description: categorie.description,
                    sousCategories: sousCategorie
                }]
            };

            return formattedCategories;
        } catch (error) {
            console.log(error);
            throw new error(error);
        }
    },

    async createCategorie(categorieBody) {
        try {
            let result = '';
            const existingCategorie = await Categorie.findOne({ name: categorieBody.name });
            if (existingCategorie) {
                result = 'Categorie is already exist';
            } else {
                const categorie = await Categorie.create(categorieBody);
                result = categorie;
            }
            return result;
        } catch (error) {
            throw new error(error.message);
        }
    }
}

module.exports = categorieServices;