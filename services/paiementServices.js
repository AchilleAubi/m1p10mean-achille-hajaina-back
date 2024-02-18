const ServiceSalonServices = require('../services/serviceSalonServices');
const OffreSpecialeServices = require('../services/offreSpecialeServices');
const FunctionServices = require('../services/functionServices');
const RendezVousServices = require('../services/rendezVousServices');

const paiementServices = {
    async paiement() {
        try {
            return 'ok';
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async montantPayer(idRendezVous) {
        try {
            let montant = 0;
            let rendezVous = await RendezVousServices.getById(idRendezVous);
            let service = rendezVous.Service;
            montant = service.prix;
            let pourcentageOffreSpeciale = await OffreSpecialeServices.getPourCentageOffreSpeciale(service._id, rendezVous.dateTime);
            montant = await FunctionServices.montantAvecOffreSpeciale(montant, pourcentageOffreSpeciale);
            return montant;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    }
}

module.exports = paiementServices;