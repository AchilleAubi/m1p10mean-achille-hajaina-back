const JournaleCaisseServices = require('../services/journaleCaisseServices');
const asyncHandler = require('express-async-handler');

let invalidToken = [];

const jouranaleCaisseController = {

    paiment: asyncHandler(async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            invalidToken.push(token);
            const data = await JournaleCaisseServices.crediter(req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    })
}

module.exports = jouranaleCaisseController;