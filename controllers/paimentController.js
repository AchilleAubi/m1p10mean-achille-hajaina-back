const PaiementServices = require('../services/paiementServices');
const asyncHandler = require('express-async-handler');

let invalidToken = [];

const paimentController = {

    paiment: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            let result = { message: "Paiment succes", status: true };
            const data = await PaiementServices.montantPayer(req.body.idRendezVous);
            res.status(200).json(result);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    })
}

module.exports = paimentController;