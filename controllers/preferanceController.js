const PreferanceServices = require('../services/preferanceServices');
const asyncHandler = require('express-async-handler');

const preferanceController = {

    getPreferanceByIdEmploye: asyncHandler(async (req, res) => {
        try {
            const idUser = req.params.idUser;
            const data = await PreferanceServices.getPreferanceByIdEmploye(idUser);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    getPreferanceByIdServices: asyncHandler(async (req, res) => {
        try {
            const idUser = req.params.idUser;
            const data = await PreferanceServices.getPreferanceByIdServices(idUser);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    creatPreferanceByEmploye: asyncHandler(async (req, res) => {
        try {
            const data = await PreferanceServices.creatPreferanceByEmploye(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    creatPreferanceByServices: asyncHandler(async (req, res) => {
        try {
            const data = await PreferanceServices.creatPreferanceByServices(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    })
}

module.exports = preferanceController;