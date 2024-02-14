const HoraireTravail = require('../models/horaireTravail');

const horaireTravailServices = {

    async getByIdUtilisateur(id) {
        try {
            const horaireTravails = await HoraireTravail.find({ User: id });
            return horaireTravails;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async insertHoraireTravail(body) {
        try {
            const horaireTravails = await HoraireTravail.create(body);
            return horaireTravails;
        } catch (error) {
            throw new error(error.message);
        }
    }
}

module.exports = horaireTravailServices;