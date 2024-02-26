const EmailServices = require('../services/emailServices');
const asyncHandler = require('express-async-handler');

const emailController = {

    send: ((req, res) => {
        try {
            const email = req.body.email;
            const subject = req.body.subject;
            const message = req.body.message;

            const result = EmailServices.sendEmail(email, subject, message);

            res.status(200).json(result);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }

    }),
}

module.exports = emailController;