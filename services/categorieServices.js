const SousCategorie = require('../models/sousCategorie');
const Categorie = require('../models/categorie')

const categorieServices = {
    async getCategorie() {
        try {
            const categories = await Categorie.find({});
            return categories;
        } catch (error) {
            throw new error(error.message);
        }
    },

    async getCategorieByID(id) {
        try {
            const categorie = await Categorie.findById(id).populate('sousCategories');

            if (!categorie) {
                throw new Error('Categorie not found');
            }

            const formattedCategories = {
                categories: [{
                    name: categorie.name,
                    description: categorie.description,
                    sousCategories: categorie.sousCategories.map(sousCategorie => ({
                        name: sousCategorie.name,
                        description: sousCategorie.description,
                        duree: sousCategorie.duree,
                        prix: sousCategorie.prix,
                        commission: sousCategorie.commission
                    }))
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