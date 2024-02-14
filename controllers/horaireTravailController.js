const HoraireTravailServices = require('../services/horaireTravailServices');
const asyncHandler = require('express-async-handler');

const horaireTravailController = {

    getHoraireTravail: asyncHandler(async (req, res) => {
        try {
            const idUser = req.params.idUser;
            const data = await HoraireTravailServices.getByIdUtilisateur(idUser);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    creatHoraireTravail: asyncHandler(async (req, res) => {
        try {
            const data = await HoraireTravailServices.insertHoraireTravail(req.body);
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }),
}

module.exports = horaireTravailController;