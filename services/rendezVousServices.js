const RendezVous = require('../models/rendezVous');
const asyncHandler = require('express-async-handler');

const rendezVousServices = {

    async creatRendezVous(data) {
        try {
            const rendezVous = {
                User: data.idClient,
                Employe: data.idEmploye,
                Service: data.service,
                dateTime: data.date,
                token: data.token,
                etat: [{
                    name: "Encour de traitement"
                }],
                payer: data.payer,
                verified: false,
                cancel: false,
            };
            const reponse = await RendezVous.create(rendezVous);
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getAllRendezVous() {
        try {
            const reponse = await RendezVous.find({}).populate('Service');
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getById(idRendezVous) {
        try {
            const reponse = await RendezVous.findOne({ _id: idRendezVous }, { cancel: false }).populate('Service');
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getByUser(user) {
        try {
            const reponse = await RendezVous.find({ User: user }).populate('Service').populate('User').populate('Employe');
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getRendezVousNonValiderByEmploye(idEmploye) {
        try {
            const reponse = await RendezVous.find({ Employe: { $in: [idEmploye, null] }, 'etat.1': { $exists: false }, cancel: false }).populate('Service');
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async updateEtat(idRendezVous, nameEtat, color) {
        try {
            const reponse = await RendezVous.updateOne({ _id: idRendezVous }, { $push: { etat: { name: nameEtat, color: color } } });
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async updateEmploye(idRendezVous, idEmploye) {
        try {
            const verified = true;
            const reponse = await RendezVous.updateOne({ _id: idRendezVous }, { Employe: idEmploye }, { verified: verified });
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getRendezVousValiderByEmploye(idEmploye) {
        try {
            const reponse = await RendezVous.find({ Employe: idEmploye, 'etat.name': 'Valider', 'etat': { $size: 2 } }).populate('Service');
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async onCancelRendezVous(idRendezVous) {
        try {
            const cancel = true;
            const reponse = await RendezVous.updateOne({ _id: idRendezVous }, { cancel: cancel });
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getRendezVousTermineByEmploye(idEmploye) {
        try {
            const reponse = await RendezVous.find({ Employe: idEmploye, 'etat.name': 'Terminer', 'etat': { $size: 3 } }).populate('Service');
            return reponse;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getAllRendezVousJournalier() {
        try {
            const response = await RendezVous.aggregate([
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$dateTime" } },
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        dateTime: "$_id",
                        count: 1
                    }
                },
                {
                    $sort: { "dateTime": 1 }
                }
            ]);
            return response;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }
    ,

    async getAllRendezVousMensuel() {
        const tabMonth = ["Janvier", 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre']
        try {
            const response = await RendezVous.aggregate([
                {
                    $project: {
                        year: { $year: "$dateTime" },
                        month: { $month: "$dateTime" }
                    }
                },
                {
                    $group: {
                        _id: { year: "$year", month: "$month" },
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        year: "$_id.year",
                        month: "$_id.month",
                        count: 1
                    }
                },
                {
                    $sort: { "year": 1, "month": 1 }
                }
            ]);
            return response;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    },

    async getStatTempsMoyen() {
        try {
            const response = await RendezVous.aggregate([
                {
                    $match: {
                        Employe: { $ne: null },
                        $expr: { $eq: [{ $size: "$etat" }, 3] }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "Employe",
                        foreignField: "_id",
                        as: "employeeData"
                    }
                },
                {
                    $unwind: "$employeeData"
                },
                {
                    $lookup: {
                        from: "services",
                        localField: "Service",
                        foreignField: "_id",
                        as: "serviceData"
                    }
                },
                {
                    $unwind: "$serviceData"
                },
                {
                    $group: {
                        _id: "$employeeData.username",
                        id: { $first: "$employeeData._id" },
                        totalDuree: { $sum: "$serviceData.dure" },
                        totalAmount: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        id: 1,
                        username: "$_id",
                        totalDuree: 1,
                        totalAmount: 1
                    }
                }
            ]);
            return response;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

}

module.exports = rendezVousServices;