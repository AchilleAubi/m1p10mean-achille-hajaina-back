const Preferance = require('../models/preferance');
const ServiceModel = require('../models/serviceModel');

const preferanceServices = {

    async getPreferance(idClient) {
        try {
            let data = await Preferance.find({ Client: idClient }).populate('Client').populate('Service').populate('Employe').populate({
                path: 'Service',
                populate: {
                    path: 'id_Categorie'
                }
            });
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getServiceByID(id) {
        try {
            const service = await ServiceModel.findById(id);
            return service;
        } catch (error) {
            throw new error(error.message);
        }
    },

    async creatPreferance(body) {
        try {
            let existingPreferance = await Preferance.findOne({ Client: body.Client, Employe: body.Employe, Service: body.Service });
            let result = existingPreferance;
            if (!existingPreferance) {
                let data = await Preferance.create(body);
                result = data;
            }
            return result;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async updatePreference(body) {
        try {
            let existingPreference = await Preferance.findOne({ _id: body.id });
            if (existingPreference) {
                existingPreference.Service = body.Service;
                existingPreference.Employe = body.Employe;
                const response = await existingPreference.save();
                return response;
            }
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    },

    async deletePreference(id) {
        try {
            const response = await Preferance.deleteOne({ _id: id });
            return response;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

}

module.exports = preferanceServices;