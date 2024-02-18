const OffreSpeciale = require('../models/offreSpeciale');
const FunctionServices = require('../services/functionServices');

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

    async getOffreSpecialeByIdService(idServce) {
        try {
            const data = await OffreSpeciale.find({ Service: idServce });
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getPourCentageOffreSpeciale(idServce, dateTime) {
        try {
            let offreSpeciale = await this.getOffreSpecialeByIdService(idServce);
            let comparaisonEntre = false;
            let pourcentageOffreSpeciale = 0;
            for (const item of offreSpeciale) {
                comparaisonEntre = await FunctionServices.comparaisonEntre(item.dateDebut, item.dateFin, dateTime);
                if (comparaisonEntre) {
                    pourcentageOffreSpeciale = pourcentageOffreSpeciale + item.pourcentage;
                }
            }
            return pourcentageOffreSpeciale;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

}

module.exports = offreSpecialeServices;