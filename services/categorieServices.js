const Categorie = require('../models/categorie');
const ServiceSalonServices = require('../services/serviceSalonServices');

const categorieServices = {
    async getCategorie() {
        try {
            const formattedCategories = {
                categories: []
            };
            const categories = await Categorie.find({}).populate('service');
            for (let index = 0; index < categories.length; index++) {
                const service = await ServiceSalonServices.getServiceByIDCategorie(categories[index]._id);
                categories[index].service = service;
                formattedCategories.categories.push(categories[index]);
            }
            console.log('formattedCategories', formattedCategories);
            return formattedCategories;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getCategorieByID(id) {
        try {
            const categorie = await Categorie.findById(id).populate('service');
            const sousCategorie = await ServiceSalonServices.getServiceByIDCategorie(id);
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