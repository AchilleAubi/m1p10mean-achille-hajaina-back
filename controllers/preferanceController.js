const PreferanceServices = require('../services/preferanceServices');
const asyncHandler = require('express-async-handler');

const preferanceController = {

    getPreferance: asyncHandler(async (req, res) => {
        try {
            const data = await PreferanceServices.getPreferance(req.params.Client);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    creatPreferance: asyncHandler(async (req, res) => {
        try {
            const data = await PreferanceServices.creatPreferance(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    updatePreferance: asyncHandler(async (req, res) => {
        try {
            const data = await PreferanceServices.updatePreference(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    deletePreferance: asyncHandler(async (req, res) => {
        try {
            const data = await PreferanceServices.deletePreference(req.body.id);
            res.status(200).json("Preference deleted");
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    })
}

module.exports = preferanceController;