const RendezVousServices = require('../services/rendezVousServices');
const HoraireTravailServices = require('../services/horaireTravailServices');
const asyncHandler = require('express-async-handler');

let invalidToken = [];

const rendezVousController = {

    getRendezVousByEmploye: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const data = await RendezVousServices.getRendezVousByEmploye(req.params.idEmploye);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    priseRendezVous: asyncHandler(async (req, res) => {
        try {
            let result = { message: "Rendez vous non envoyer raison de non travail de l'employe", status: false };
            let idEmploye = req.body.idEmploye;
            let dateRendezVous = req.body.date;
            let data = '';
            if (idEmploye != null) {
                const checkHoraireTravail = await HoraireTravailServices.checkIfHoraireTravail(idEmploye, dateRendezVous);
                if (checkHoraireTravail) {
                    result.message = 'Rendez-vous envoyer';
                    result.status = true;
                    data = await RendezVousServices.creatRendezVous(req.body);
                }
            } else {
                result.message = 'Rendez-vous envoyer';
                result.status = true;
                data = await RendezVousServices.creatRendezVous(req.body);
            }
            res.status(200).json(result);
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
    })
}

module.exports = rendezVousController;