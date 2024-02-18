const User = require('../models/user');
const ServiceSalonServices = require('./serviceSalonServices');

const employeServices = {
    async getAlllEmploye() {
        try {
            const data = await User.find({ role: 'Emploie' });
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },
}

module.exports = employeServices;