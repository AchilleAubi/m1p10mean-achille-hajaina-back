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
            const idEmploye = req.params.idEmploye;
            console.log('idEmploye', idEmploye);
            const rendeVous = await RendezVousServices.getRendezVousTermineByEmploye(idEmploye);

            let totatMontant = 0;
            let dateKey = '';
            const commision = 5;

            const groupedData = rendeVous.reduce((acc, current) => {
                let date = '';
                for (let etat of current.etat) {
                    if (etat.name == 'Terminer') {
                        date = moment(etat.date, "YYYY-MM-DD").toDate();
                        dateKey = date.toISOString().split('T')[0];
                        console.log('dateKey', dateKey, current.Service.prix);
                    }
                }

                if (date) {
                    if (!acc[dateKey]) {
                        acc[dateKey] = {
                            date: dateKey,
                            totalServiceEffectuer: 0,
                            totalMontantCommission: 0,
                            totalMontantCommissionPourcentage: commision,
                            status: false
                        };
                    }

                    let montantCommission = (current.Service.prix * commision) / 100;

                    acc[dateKey].totalServiceEffectuer += current.Service.prix;
                    acc[dateKey].totalMontantCommission += montantCommission;
                    acc[dateKey].status = true;
                } else {
                    console.log('Terminer state not found');
                }
                return acc;
            }, {});

            // Convertir l'objet en tableau pour avoir un format de réponse similaire à ce que vous attendez
            const resultArray = Object.values(groupedData);

            console.log('resultArray', resultArray);
            res.status(200).json(resultArray);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),

    debaucher: asyncHandler(async (req, res) => {
        try {
            const user = await EmployeServices.debaucher(req.params.idEmploye);
            res.status(200).json(user);
        } catch (error) {
            res.status(500);
            console.log(error);
            throw new error(error.message);
        }
    }),

}

module.exports = portFeuilleController;