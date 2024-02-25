const moment = require('moment');

const functionServices = {

    async comparaisonEntre(dateDebut, dateFin, date) {
        try {
            let result = false;
            const dateRendezVousObj = moment(date, "YYYY-MM-DD HH:mm:ss").toDate();

            const dateTimeDebut = moment(dateDebut).toDate();
            const dateTimeFin = moment(dateFin).toDate();

            if (dateRendezVousObj >= dateTimeDebut && dateRendezVousObj <= dateTimeFin) {
                result = true;
            }
            return result;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async montantAvecOffreSpecialeAvecpaye(montant, pourcentage, paye) {
        try {
            let restPaye = 0;
            let montantPourcentage = (montant * pourcentage) / 100;
            restPaye = montant - montantPourcentage - paye;
            return restPaye;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    }
}

module.exports = functionServices;