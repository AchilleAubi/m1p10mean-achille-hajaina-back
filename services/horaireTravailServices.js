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

    async minutesToHeureMinute(minutes) {
        const heures = Math.floor(minutes / 60);
        const minutesRestantes = minutes % 60;
        const chaineHeureMinute = `${heures}h ${minutesRestantes}min`;
        return chaineHeureMinute;
    },

    async getAllHoraireTravail() {
        try {
            const horaireTravails = await HoraireTravail.find({});
            return horaireTravails;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
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
            let dateTimeDebut = '';
            let dateTimeFin = '';
            if (horaireTravail) {
                dateTimeDebut = moment(horaireTravail.dateTimeDebut).toDate();
                dateTimeFin = moment(horaireTravail.dateTimeFin).toDate();
            }
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