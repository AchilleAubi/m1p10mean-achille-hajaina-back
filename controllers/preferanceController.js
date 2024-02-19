const PreferanceServices = require('../services/preferanceServices');
const asyncHandler = require('express-async-handler');

let invalidToken = [];

const preferanceController = {

    getPreferanceByIdEmploye: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
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
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
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
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const data = await PreferanceServices.creatPreferanceByEmploye(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    creatPreferanceByServices: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const data = await PreferanceServices.creatPreferanceByServices(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    })
}

module.exports = preferanceController;