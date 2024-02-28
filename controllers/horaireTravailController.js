const HoraireTravailServices = require('../services/horaireTravailServices');
const EmployeServices = require('../services/employeServices');
const asyncHandler = require('express-async-handler');
const moment = require('moment');
const RendezVousServices = require('../services/rendezVousServices');
const mongoose = require('mongoose');

let invalidToken = [];
const { ObjectId } = mongoose.Types;
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

    comparerObjetsIds(id1, id2) {
        if (!mongoose.Types.ObjectId.isValid(id1) || !mongoose.Types.ObjectId.isValid(id2)) {
            return false;
        }
        return mongoose.Types.ObjectId.equals(id1, id2);
    },

    finddAllHoraireTravail: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const arrayRendezVous = [];
            const RendezVous = await RendezVousServices.getStatTempsMoyen();
            for (var i = 0; i < RendezVous.length; i++) {
                const result = {
                    id: RendezVous[i].id,
                    totalDuree: RendezVous[i].totalDuree,
                    username: RendezVous[i].username,
                    totalAmount: RendezVous[i].totalAmount,
                    moyenne: Math.round(RendezVous[i].totalDuree / RendezVous[i].totalAmount),
                    enHeure: await HoraireTravailServices.minutesToHeureMinute(Math.round(RendezVous[i].totalDuree / RendezVous[i].totalAmount))
                };
                arrayRendezVous.push(result);
            }

            res.status(200).json(arrayRendezVous);
        } catch (error) {
            res.status(500).json({ error: error.message });
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