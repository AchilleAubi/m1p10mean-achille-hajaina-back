const OffreSpecialeServices = require('../services/offreSpecialeServices');
const asyncHandler = require('express-async-handler');

const offreSpecialeController = {

    createOffreSpeciale: asyncHandler(async (req, res) => {
        try {
            const io = req.app.get('io');
            const data = await OffreSpecialeServices.CreateOffreSpeciale(req.body);
            io.emit('newAddOffre', data);
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
    }),
    updateOffreSpeciale: asyncHandler(async (req, res) => {
        try {
            const idOffre = req.body.idOffre;
            const io = req.app.get('io');
            const data = await OffreSpecialeServices.updateOffre(idOffre);
            io.emit('newUpdateOffre', data);
            res.status(200).json({ message: 'Offre spéciale mise à jour avec succès.' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })

}

module.exports = offreSpecialeController;