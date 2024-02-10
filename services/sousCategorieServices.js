const SousCategorie = require('../models/sousCategorie');
const Categorie = require('../models/categorie')

const sousCategorieServices = {
    async getSousCategorie() {
        try {
            const sousCategories = await SousCategorie.find({}).populate('id_Categorie');
            return sousCategories;
        } catch (error) {
            throw new error(error.message);
        }
    },

    async getSousCategorieByID(id) {
        try {
            const sousCategories = await SousCategorie.findById(id).populate('id_Categorie');
            return sousCategories;
        } catch (error) {
            throw new error(error.message);
        }
    },

    async createSousCategorie(sousCategorieBody) {
        try {
            let result = '';
            const existingCategorie = await Categorie.findById(sousCategorieBody.id_Categorie);
            if (existingCategorie) {
                const existingSousCategorie = await SousCategorie.findOne({ name: sousCategorieBody.name });
                if (existingSousCategorie) {
                    result = 'SousCategorie already exists in the specified Categorie';
                } else {
                    const sousCategorie = await SousCategorie.create(sousCategorieBody);
                    result = sousCategorie;
                }
            }
            else {
                result = 'Categorie not exists';
            }
            return result;
        } catch (error) {
            throw new error(error.message);
        }
    },

    async getSousCategorieByIDCategorie(categorieId) {
        try {
            const sousCategories = await SousCategorie.find({ id_Categorie: categorieId }).populate('id_Categorie');
            return sousCategories;
        } catch (error) {
            throw new error(error.message);
        }
    }
}

module.exports = sousCategorieServices;