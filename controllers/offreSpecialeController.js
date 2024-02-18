const OffreSpecialeServices = require('../services/offreSpecialeServices');
const asyncHandler = require('express-async-handler');

const offreSpecialeController = {

    createOffreSpeciale: asyncHandler(async (req, res) => {
        try {
            const data = await OffreSpecialeServices.CreateOffreSpeciale(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    getOffreSpeciale: asyncHandler(async (req, res) => {
        try {
            const data = await OffreSpecialeServices.getOffreSpeciale();
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    })
}

module.exports = offreSpecialeController;