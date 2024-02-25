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
            const data = await PaiementServices.montantPayer(req.body);
            res.status(200).json(data);
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
                montantPayer = await PaiementServices.montantPayer([{ idRendezVous: req.body.idRendezVous }]);
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