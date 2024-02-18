const OffreSpeciale = require('../models/offreSpeciale');

const offreSpecialeServices = {

    async CreateOffreSpeciale(body) {
        try {
            const data = await OffreSpeciale.create(body);
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getOffreSpeciale() {
        try {
            const data = await OffreSpeciale.find({});
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },
}

module.exports = offreSpecialeServices;