const User = require('../models/user');
const ServiceSalonServices = require('./serviceSalonServices');

const employeServices = {
    async getAlllEmploye() {
        try {
            const data = await User.find({ role: 'Emploie', active: true }).populate('emplois.Categorie');
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getEmployeByIdCategori(idCategorie) {
        try {
            const data = await User.find({ role: 'Emploie', 'emplois.Categorie': { $in: idCategorie } });
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async findlEmploye(idEmp) {
        try {
            const data = await User.findOne({ _id: idEmp });
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async debaucher(idEmp) {
        try {
            const data = await User.updateOne({ _id: idEmp }, { active: false });
            return data;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    }
}

module.exports = employeServices;