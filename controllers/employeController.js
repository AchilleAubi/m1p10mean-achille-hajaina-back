const EmployeServices = require('../services/employeServices');
const CategorieServices = require('../services/categorieServices');
const RendezVousServices = require('../services/rendezVousServices');
const asyncHandler = require('express-async-handler');
const moment = require('moment');

let invalidToken = [];

const portFeuilleController = {

    getAlllEmploye: asyncHandler(async (req, res) => {
        try {
            const result = { content: '', status: false };
            const data = await EmployeServices.getAlllEmploye();
            result.content = data;
            result.status = true;
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    getEmployeByIdCategori: asyncHandler(async (req, res) => {
        try {
            const result = { content: '', status: false };
            const categories = await CategorieServices.getAllCategorie();
            const data = [];
            for (const category of categories) {
                const employes = await EmployeServices.getEmployeByIdCategori(category._id);
                const idCat = category._id;
                data.push({ idCat, employes });
            }
            result.content = data;
            result.status = true;
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    commissionJouree: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const result = { totalServiceEffectuer: 0, commission: 0, totalPourcentage: 0, status: true };
            const dateNow = moment(req.body.dateNow, "YYYY-MM-DD").toDate();
            const idEmploye = req.body.idEmploye;
            const rendeVous = await RendezVousServices.getRendezVousTermineByEmploye(idEmploye);
            let totalPourcentage = 0;
            let date = '';
            let conte = 0;
            let montant = 0;
            console.log('totalPourcentage', totalPourcentage);
            for (let item of rendeVous) {
                for (let etat of item.etat) {
                    if (etat.name == 'Terminer') {
                        date = moment(etat.date, "YYYY-MM-DD").toDate();
                    }
                }
                if (dateNow <= date) {
                    conte = conte + 1;
                    montant = montant + item.Service.prix;
                    totalPourcentage = totalPourcentage + item.Service.commision;
                }
            }
            console.log('conte', conte);
            // totalPourcentage = conte * 5;
            result.totalServiceEffectuer = conte;
            result.commission = montant;
            result.totalPourcentage = totalPourcentage;
            result.status = true;
            res.status(200).json(result);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    })

}

module.exports = portFeuilleController;