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
    },

    async getStatCAjournalier() {
        try {
            const response = await JournaleCaisse.aggregate([
                {
                    $match: { sortiMontant: 0 } // Filtrer les données où sortiMontant est égal à 0
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$dateTime" } },
                        totalAmount: { $sum: "$entrerMontant" }
                    }
                }
            ]);
            return response;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    },

    async getStatCAmensuel() {
        try {
            const response = await JournaleCaisse.aggregate([
                {
                    $match: { sortiMontant: 0 }
                },
                {
                    $group: {
                        _id: {
                            year: { $year: "$dateTime" },
                            month: { $month: "$dateTime" }
                        },
                        totalAmount: { $sum: "$entrerMontant" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        year: "$_id.year",
                        month: "$_id.month",
                        totalAmount: 1
                    }
                },
                {
                    $sort: { year: 1, month: 1 }
                }
            ]);
            return response;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    },
    async getStatBeneficeMensuel() {
        try {
            const response = await JournaleCaisse.aggregate([
                {
                    $group: {
                        _id: "$libelle",
                        totalAmount: { $sum: "$entrerMontant" }
                    }
                }
            ]);
            return response;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

}

module.exports = journaleCaisseServices;