const EmployeServices = require('../services/employeServices');
const asyncHandler = require('express-async-handler');

const portFeuilleController = {

    getAlllEmploye: asyncHandler(async (req, res) => {
        try {
            const result = { content: '', status: false };
            const solde = await EmployeServices.getAlllEmploye();
            result.content = solde;
            result.status = true;
            res.status(200).json(solde);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    })
}

module.exports = portFeuilleController;