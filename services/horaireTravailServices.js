const HoraireTravail = require('../models/horaireTravail');
const moment = require('moment');

const horaireTravailServices = {

    async getByIdEmploye(idEmploye) {
        try {
            const horaireTravails = await HoraireTravail.find({ Employe: idEmploye });
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
    },

    async checkIfHoraireTravail(idEmploye, dateRendezVous) {
        try {
            let result = false;
            const dateRendezVousObj = moment(dateRendezVous, "YYYY-MM-DD HH:mm:ss").toDate();
            const horaireTravail = await HoraireTravail.findOne({ Employe: idEmploye });

            const dateTimeDebut = moment(horaireTravail.dateTimeDebut).toDate();
            const dateTimeFin = moment(horaireTravail.dateTimeFin).toDate();

            if (dateRendezVousObj >= dateTimeDebut && dateRendezVousObj <= dateTimeFin) {
                result = true;
            }
            return result;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    }
}

module.exports = horaireTravailServices;