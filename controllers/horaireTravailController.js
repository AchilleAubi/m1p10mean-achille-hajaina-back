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

            const horaireTravails = await HoraireTravailServices.getAllHoraireTravail();
            const employeeTotals = {};
            horaireTravails.forEach(horaire => {
                const employeeId = horaire.Employe;
                if (!employeeTotals[employeeId]) {
                    employeeTotals[employeeId] = {
                        diffHours: 0,
                        diffMinutes: 0
                    };
                }
                const diffDate = moment.duration(moment(horaire.dateTimeFin).diff(moment(horaire.dateTimeDebut)));
                employeeTotals[employeeId].diffHours += diffDate.hours();
                employeeTotals[employeeId].diffMinutes += diffDate.minutes();
            });

            const arrayResult = Object.keys(employeeTotals).map(employeeId => ({
                Employe: employeeId,
                diffMinutes: employeeTotals[employeeId].diffMinutes + ((employeeTotals[employeeId].diffHours) * 60)
            }));



            const arrayRendezVous = [];
            var last = "test";
            const RendezVous = await RendezVousServices.getAllRendezVous();
            RendezVous.forEach(rendezVous => {
                if (rendezVous.etat.length == 3) {
                    if (last != String(rendezVous.Employe)) {
                        const result = {
                            Employe: rendezVous.Employe,
                            duree: rendezVous.Service.dure
                        };
                        arrayRendezVous.push(result);
                        last = rendezVous.Employe;
                    }
                    else {
                        for (var i = 0; i < arrayRendezVous.length; i++) {
                            if (arrayRendezVous[i].Employe == String(rendezVous.Employe)) {
                                arrayRendezVous[i].duree = arrayRendezVous[i].duree + rendezVous.Service.dure;
                            }
                        }
                    }
                }

            });

            var arrayFinal = [];

            for (var i = 0; i < arrayResult.length; i++) {
                for (var x = 0; x < arrayRendezVous.length; x++) {
                    if (String(arrayResult[i].Employe) == String(arrayRendezVous[x].Employe)) {
                        var employeName = await EmployeServices.findlEmploye(String(arrayResult[i].Employe));
                        console.log(employeName);
                        const result = {
                            Employe: arrayResult[i].Employe,
                            name: employeName.username,
                            duree_travail: await HoraireTravailServices.minutesToHeureMinute(arrayRendezVous[x].duree),
                            horaire_travail: await HoraireTravailServices.minutesToHeureMinute(arrayResult[i].diffMinutes),
                            pourcentage: parseInt((100 * arrayRendezVous[x].duree) / arrayResult[i].diffMinutes)
                        };
                        arrayFinal.push(result);
                    }
                }
            }

            //res.status(200).json(arrayResult);
            //res.status(200).json(arrayRendezVous);
            res.status(200).json(arrayFinal);
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