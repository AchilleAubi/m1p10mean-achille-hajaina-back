const nodemailer = require('nodemailer');

const emailServices = {
    async sendEmail(email, subject, message) {
        try {
            const data = { status: true, message: '' };

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
                    data.status = false;
                    data.message = 'Error sending email';
                    console.log(error);
                } else {
                    data.status = true;
                    data.message = 'Email sent successfully';
                    console.log('Email sent:', info.response);
                }
            });

            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    }
}

module.exports = emailServices;