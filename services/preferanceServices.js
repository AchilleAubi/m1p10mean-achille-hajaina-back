const Preferance = require('../models/preferance');

const preferanceServices = {

    async getPreferanceByIdEmploye(idClient) {
        try {
            const data = await Preferance.find({ Client: idClient, Service: null });
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getPreferanceByIdServices(idClient) {
        try {
            const data = await Preferance.find({ Client: idClient, Employe: null });
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async creatPreferanceByServices(body) {
        try {
            const existingPreferance = await Preferance.find({ Client: body.Client, Service: body.Service });
            const result = existingPreferance;
            if (!existingPreferance) {
                const data = await Preferance.create(body);
                result = data;
            }
            return result;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async creatPreferanceByEmploye(body) {
        try {
            const existingPreferance = await Preferance.find({ Client: body.Client, Employe: body.Employe });
            const result = existingPreferance;
            if (!existingPreferance) {
                const data = await Preferance.create(body);
                result = data;
            }
            return result;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    }
}

module.exports = preferanceServices;