const HoraireTravailServices = require('../services/horaireTravailServices');
const asyncHandler = require('express-async-handler');

let invalidToken = [];

const horaireTravailController = {

    getHoraireTravail: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const idEmploye = req.params.idEmploye;
            const data = await HoraireTravailServices.getByIdEmploye(idEmploye);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    creatHoraireTravail: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const data = await HoraireTravailServices.insertHoraireTravail(req.body);
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }),
}

module.exports = horaireTravailController;