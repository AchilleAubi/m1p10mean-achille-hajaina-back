const ServiceModel = require('../models/serviceModel');
const Categorie = require('../models/categorie')

const serviceSalonServices = {
    async getService() {
        try {
            const services = await ServiceModel.find({}).populate('id_Categorie');
            return services;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getServiceByID(id) {
        try {
            const service = await ServiceModel.findById(id).populate('id_Categorie');
            return service;
        } catch (error) {
            throw new error(error.message);
        }
    },

    async createService(serviceSalonBody) {
        try {
            let result = '';
            const existingCategorie = await Categorie.findById(serviceSalonBody.id_Categorie);
            if (existingCategorie) {
                const existingServicesSalon = await ServiceModel.findOne({ name: serviceSalonBody.name });
                if (existingServicesSalon) {
                    result = 'Service already exists in the specified Categorie';
                } else {
                    const services = await ServiceModel.create(serviceSalonBody);
                    result = services;
                }
            }
            else {
                result = 'Categorie not exists';
            }
            return result;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getServiceByIDCategorie(categorieId) {
        try {
            console.log('categorieId', categorieId);
            const services = await ServiceModel.find({ id_Categorie: categorieId }).populate('id_Categorie');
            return services;
        } catch (error) {
            throw new error(error.message);
        }
    }
}

module.exports = serviceSalonServices;