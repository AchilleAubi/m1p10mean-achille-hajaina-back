const RendezVous = require('../models/rendezVous');

const rendezVousServices = {

    async creatRendezVous(data) {
        try {
            const rendezVous = {
                User: data.idClient,
                Employe: data.idEmploye,
                Service: data.service,
                dateTime: data.date,
                token: data.token,
                etat: [{
                    name: "Encour de traitement"
                }],
                payer: data.payer,
                verified: false,
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
            const reponse = await RendezVous.find({}).populate('Service');
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getById(idRendezVous) {
        try {
            const reponse = await RendezVous.findOne({ _id: idRendezVous }).populate('Service');
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getByUser(user) {
        try {
            const reponse = await RendezVous.find({ User: user }).populate('Service').populate('User').populate('Employe');
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getRendezVousNonValiderByEmploye(idEmploye) {
        try {
            const reponse = await RendezVous.find({ Employe: { $in: [idEmploye, null] }, 'etat.1': { $exists: false } }).populate('Service');
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async updateEtat(idRendezVous, nameEtat, color) {
        try {
            const reponse = await RendezVous.updateOne({ _id: idRendezVous }, { $push: { etat: { name: nameEtat, color: color } } });
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async updateEmploye(idRendezVous, idEmploye) {
        try {
            const reponse = await RendezVous.updateOne({ _id: idRendezVous }, { Employe: idEmploye });
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    }
}

module.exports = rendezVousServices;