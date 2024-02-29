const RendezVousServices = require('../services/rendezVousServices');
const HoraireTravailServices = require('../services/horaireTravailServices');
const asyncHandler = require('express-async-handler');
const PorteFeuilleServices = require('../services/porteFeuilleServices');

let invalidToken = [];

const rendezVousController = {

    getRendezVousByEmploye: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const data = await RendezVousServices.getRendezVousNonValiderByEmploye(req.params.idEmploye);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    priseRendezVous: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            let arrayResult = [];
            let data = '';
            for (const item of req.body) {
                let result = { idClient: '', idEmploye: '', service: '', date: '', id: '', payer: 0, verified: false, cancel: false, content: { message: 'Rendez-vous non envoyer', status: true } };
                data = await RendezVousServices.creatRendezVous(item);
                if (data) {
                    result.content = { message: "Rendez-vous envoyer.", status: true };
                    result.idClient = item.idClient;
                    result.idEmploye = item.idEmploye;
                    result.service = item.service;
                    result.date = item.date;
                    result.id = data._id;
                    result.payer = item.payer;
                    result.verified = false;
                    result.cancel = false;
                }
                arrayResult.push(result);
            }
            res.status(200).json(arrayResult);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }),

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

    getRendezVousByUser: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const data = await RendezVousServices.getByUser(req.params.User);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    validerRendezVous: asyncHandler(async (req, res) => {
        try {
            const valider = { name: 'Valider', color: 'success' }
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            let idRendezVous = req.body.idRendezVous;
            let idEmploye = req.body.idEmploye;
            let result = { message: "Rendez non valider", status: false };
            const updateEmploye = await RendezVousServices.updateEmploye(idRendezVous, idEmploye);
            const updateEtat = await RendezVousServices.updateEtat(idRendezVous, valider.name, valider.color);
            if (updateEmploye && updateEtat) {
                result.message = "Rendez valider";
                result.status = true;
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    refuserRendezVous: asyncHandler(async (req, res) => {
        try {
            const valider = { name: req.body.raison, color: 'danger' }
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            let idRendezVous = req.body.idRendezVous;
            let idEmploye = req.body.idEmploye;
            let result = { message: "Rendez-vous non refuser", status: false };
            const oneRdv = await RendezVousServices.getById(idRendezVous);
            const updateEmploye = await RendezVousServices.updateEmploye(idRendezVous, idEmploye);
            const updateEtat = await RendezVousServices.updateEtat(idRendezVous, valider.name, valider.color);
            const updatePayer = await RendezVousServices.updatePayer(idRendezVous, oneRdv.prix);
            const body = [{
                entrer: oneRdv.payer,
                sortie: 0,
                User: oneRdv.User
            }];
            const depotSolde = await PorteFeuilleServices.depotSolde(body);
            if (updateEmploye && updateEtat) {
                result.message = "Rendez-vous refuser";
                result.status = true;
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    updateRay: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            let idRendezVous = req.body.idRendezVous;
            let prix = req.body.payer
            const updatePayer = await RendezVousServices.updatePayer(idRendezVous, prix);
            res.status(200).json('Ok');
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    verifierRendezVous: asyncHandler(async (req, res) => {
        try {
            let arrayResult = [];
            let idEmploye = '';
            let dateRendezVous = '';
            let checkHoraireTravail = '';
            for (const item of req.body) {
                let result = { idClient: item.idClient, idEmploye: item.idEmploye, service: item.service, date: item.date, content: { message: 'Employeur non disponible sur le date sélectionné', status: false } };
                idEmploye = item.idEmploye;
                dateRendezVous = item.date;
                if (idEmploye != null) {
                    checkHoraireTravail = await HoraireTravailServices.checkIfHoraireTravail(idEmploye, dateRendezVous);
                    if (checkHoraireTravail) {
                        result.content = { message: "Verification avec succèes", status: true };
                        result.idClient = item.idClient;
                        result.idEmploye = item.idEmploye;
                        result.service = item.service;
                        result.date = item.date;
                    }
                } else {
                    result.content = { message: "Verification succèes (sans employeur sélectionné)", status: true };
                    result.idClient = item.idClient;
                    result.idEmploye = item.idEmploye;
                    result.service = item.service;
                    result.date
                }
                arrayResult.push(result);
            }
            res.status(200).json(arrayResult);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }),

    terminerRendezVous: asyncHandler(async (req, res) => {
        try {
            const valider = { name: 'Terminer', color: 'primary' }
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            let updateEtat = '';
            let arrResult = [];
            for (const item of req.body) {
                let result = { message: "Rendez non valider", status: false };
                updateEtat = await RendezVousServices.updateEtat(item.idRendezVous, valider.name, valider.color);
                if (updateEtat) {
                    result.idRendezVous = item.idRendezVous;
                    result.message = "Rendez valider";
                    result.status = true;
                }
                arrResult.push(result);
            }
            res.status(200).json(arrResult);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    getRendezVousNonEffecteuer: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const idEmploye = req.params.idEmploye;
            let arrResult = [];
            arrResult = await RendezVousServices.getRendezVousValiderByEmploye(idEmploye);
            console.log('Non Effectuer', idEmploye, arrResult.length);
            res.status(200).json(arrResult);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    cancelRendezVous: asyncHandler(async (req, res) => {
        try {
            const updateEtat = await RendezVousServices.onCancelRendezVous(req.body.idRendezVous);
            res.status(200).json(updateEtat);
        }
        catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    getRendezVousEffecteuer: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const idEmploye = req.params.idEmploye;
            let arrResult = [];
            arrResult = await RendezVousServices.getRendezVousTermineByEmploye(idEmploye);
            console.log('Effectuer', idEmploye, arrResult.length);
            res.status(200).json(arrResult);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    getStatRendezVousJournalier: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const data = await RendezVousServices.getAllRendezVousJournalier();
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    getStatRendezVousMensuel: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const data = await RendezVousServices.getAllRendezVousMensuel();
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    getRdvValiderByUser: asyncHandler(async (req, res) => {
        try {
            const data = await RendezVousServices.getRdvValiderByUser(req.params.user);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    })
}

module.exports = rendezVousController;