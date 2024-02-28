const JournaleCaisseServices = require('../services/journaleCaisseServices');
const OffreSpecialeServices = require('../services/offreSpecialeServices');
const FunctionServices = require('../services/functionServices');
const RendezVousServices = require('../services/rendezVousServices');

const paiementServices = {
    async paiement(montant, idRendezVous) {
        try {
            const data = JournaleCaisseServices.crediter(montant, idRendezVous, "Payment rendez-vous",)
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async paiementAutreDepense(montant, libelle) {
        try {
            const data = JournaleCaisseServices.payerDepense(montant, libelle)
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async montantPayer(rendezVous) {
        try {
            let results = [];
            for (const item of rendezVous) {
                let montant = 0;
                let rendezVous = await RendezVousServices.getById(item.idRendezVous);
                let service = 0;
                let pourcentageOffreSpeciale = 0;
                let datapaye = '';
                let paye = 0;
                let result = { montantNonPaye: null, montantPaye: null, pourcentageOffreSpeciale: null, idRendezVous: null }
                if (rendezVous) {
                    service = rendezVous.Service;
                    if (service) {
                        montant = service.prix;
                        pourcentageOffreSpeciale = await OffreSpecialeServices.getPourCentageOffreSpeciale(service._id, rendezVous.dateTime);
                        datapaye = await JournaleCaisseServices.getMontantRestByIdRendezVous(item.idRendezVous);
                        for (const item of datapaye) {
                            paye = paye + item.entrerMontant;
                        }
                        console.log('paye', paye);
                        result.pourcentageOffreSpeciale = pourcentageOffreSpeciale * -1;
                        result.montantPaye = paye;
                        result.idRendezVous = item.idRendezVous;
                        montant = await FunctionServices.montantAvecOffreSpecialeAvecpaye(montant, pourcentageOffreSpeciale, paye);
                    }
                }
                result.montantNonPaye = montant;
                results.push(result);
            }
            return results;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    }
}

module.exports = paiementServices;