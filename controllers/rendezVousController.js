const RendezVousServices = require('../services/rendezVousServices');
const asyncHandler = require('express-async-handler');

let invalidToken = [];

const rendezVousController = {

    getAllRendezVous: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const data = await RendezVousServices.getAllRendezVous();
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    priseRendezVous: asyncHandler(async (req, res) => {
        try {
            let result = 'Rendez vous Errored';
            const data = await RendezVousServices.creatRendezVous(req.body);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }),

    getRendezVousByEmploye: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const data = await RendezVousServices.getRendezVousByEmploye(req.params.id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    })
}

module.exports = rendezVousController;