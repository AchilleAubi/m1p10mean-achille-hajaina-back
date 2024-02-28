const JournaleCaisse = require('../models/journaleCaisse');

const journaleCaisseServices = {
    async crediter(montant, idRendezVous, libelle) {
        try {
            const donnee = {
                sortiMontant: 0,
                entrerMontant: montant,
                libelle: libelle,
                RendezVous: idRendezVous
            };
            const data = await JournaleCaisse.create(donnee);
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async payerDepense(montant, libelle) {
        try {
            const donnee = {
                sortiMontant: montant,
                entrerMontant: 0,
                libelle: libelle
            };
            const data = await JournaleCaisse.create(donnee);
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async debiter(montant, idRendezVous, libelle) {
        try {
            const donnee = {
                sortiMontant: 0,
                entrerMontant: montant,
                libelle: libelle,
                RendezVous: idRendezVous
            };
            const data = await JournaleCaisse.create(donnee);
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getMontantRestByIdRendezVous(idRendezVous) {
        try {
            const data = await JournaleCaisse.find({ RendezVous: idRendezVous });
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    }

}

module.exports = journaleCaisseServices;