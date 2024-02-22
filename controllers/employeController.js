const EmployeServices = require('../services/employeServices');
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
            const idCategorie = req.params.idCategorie;
            const result = { content: '', status: false };
            const data = await EmployeServices.getEmployeByIdCategori(idCategorie);
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