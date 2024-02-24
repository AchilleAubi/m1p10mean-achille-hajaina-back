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

    async montantPayer(idRendezVous) {
        try {
            let montant = 0;
            let rendezVous = await RendezVousServices.getById(idRendezVous);
            let service = 0;
            let pourcentageOffreSpeciale = 0;
            let dataRestPayer = '';
            let restPayer = 0;
            if (rendezVous) {
                service = rendezVous.Service;
                if (service) {
                    montant = service.prix;
                    pourcentageOffreSpeciale = await OffreSpecialeServices.getPourCentageOffreSpeciale(service._id, rendezVous.dateTime);
                    dataRestPayer = await JournaleCaisseServices.getMontantRestByIdRendezVous(idRendezVous);
                    for (const item of dataRestPayer) {
                        restPayer = restPayer + item.entrerMontant;
                    }
                    console.log('restPayer', restPayer);
                    montant = await FunctionServices.montantAvecOffreSpecialeAvecRestPayer(montant, pourcentageOffreSpeciale, restPayer);
                }
            }
            return montant;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    }
}

module.exports = paiementServices;