const EmployeServices = require('../services/employeServices');
const CategorieServices = require('../services/categorieServices');
const asyncHandler = require('express-async-handler');

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
    })

}

module.exports = portFeuilleController;