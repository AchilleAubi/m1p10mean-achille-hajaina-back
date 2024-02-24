const PaiementServices = require('../services/paiementServices');
const JournaleCaisseServices = require('../services/journaleCaisseServices');
const asyncHandler = require('express-async-handler');

let invalidToken = [];

const paimentController = {

    getMontantRest: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            let arrayResult = [];
            for (const item of req.body) {
                let result = { idRendezVous: '', montant: null, status: false };
                const data = await PaiementServices.montantPayer(item.idRendezVous);
                result.idRendezVous = item.idRendezVous;
                result.montant = data;
                result.status = true;
                arrayResult.push(result);
            }
            res.status(200).json(arrayResult);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    paiment: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            let result = { content: "Paiment succes", status: true };
            let data = '';
            let montantPayer = 0;

            for (const item of req.body) {
                montantPayer = await PaiementServices.montantPayer(req.body.idRendezVous);
                data = PaiementServices.paiement(item.montant, item.idRendezVous);
            }

            result.content = 'Paiment succes';
            result.status = true;
            res.status(200).json(result);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    })
}

module.exports = paimentController;