const PorteFeuilleServices = require('../services/porteFeuilleServices');
const asyncHandler = require('express-async-handler');

let invalidToken = [];

const portFeuilleController = {

    getSoldeByIdUsuer: asyncHandler(async (req, res) => {
        try {
            const idUser = req.params.idUser
            const solde = await PorteFeuilleServices.getSoldeByIdUtilisateur(idUser);
            res.status(200).json(solde);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    achat: asyncHandler(async (req, res) => {
        try {
            const achat = await PorteFeuilleServices.achat(req.body);
            res.status(200).json(achat);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }),

    depotSolde: asyncHandler(async (req, res) => {
        try {
            const depotSolde = await PorteFeuilleServices.depotSolde(req.body);
            res.status(200).json(depotSolde);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }),
}

module.exports = portFeuilleController;