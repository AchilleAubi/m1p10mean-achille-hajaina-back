const JournaleCaisseServices = require('../services/journaleCaisseServices');
const asyncHandler = require('express-async-handler');

let invalidToken = [];

const jouranaleCaisseController = {

    paiment: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const data = await JournaleCaisseServices.crediter(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    getStatCAjournalier: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const data = await JournaleCaisseServices.getStatCAjournalier()
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),
    getStatCAmensuel: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const data = await JournaleCaisseServices.getStatCAmensuel();
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),
    getStatBeneficeMensuel: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const data = await JournaleCaisseServices.getStatBeneficeMensuel();

            let sumSortie = 0;
            let totals = {
                Paiement: 0, Loyer: 0, Salaire: 0, Achat: 0, Autres: 0
            };

            data.forEach(item => {
                const label = String(item._id);
                if (totals.hasOwnProperty(label) && label != "Payment rendez-vous") {
                    totals[label] = item.totalAmount;
                    sumSortie += item.totalAmount;
                }
                else {
                    totals["Paiement"] = item.totalAmount;
                }
            });
            const benefice = totals.Paiement - sumSortie;
            let result = {
                Paiement: totals.Paiement,
                Loyer: totals.Loyer,
                Salaire: totals.Salaire,
                Achat: totals.Achat,
                Autres: totals.Autres,
                Benefice: benefice
            };

            res.status(200).json(result);
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    })
}

module.exports = jouranaleCaisseController;