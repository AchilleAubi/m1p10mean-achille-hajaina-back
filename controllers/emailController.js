const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const emailController = {

    send: ((req, res) => {
        const subject = req.body.subject;
        const email = req.body.email;
        const message = req.body.message;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.forwardemail.net",
            port: 465,
            secure: true,
            auth: {
                user: 'achille.diris@gmail.com',
                pass: 'fuvg hhiu ponr fsqb'
            }
        });

        const mailOptions = {
            from: 'achille.diris@gmail.com',
            to: email,
            subject: subject,
            text: message
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent:', info.response);
                res.status(200).send('Email sent successfully');
            }
        });
    }),
}

module.exports = emailController;