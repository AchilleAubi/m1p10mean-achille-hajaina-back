const RendezVous = require('../models/rendezVous');

const rendezVousServices = {

    async creatRendezVous(data) {
        try {
            console.log('data', data);
            const rendezVous = {
                User: data.idClient,
                Employe: data.idEmploye,
                Service: data.service,
                dateTime: data.date,
                etat: [{
                    name: "Encour de traitement"
                }]
            };
            const reponse = await RendezVous.create(rendezVous);
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getAllRendezVous() {
        try {
            const reponse = await RendezVous.find({});
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    }
}

module.exports = rendezVousServices;