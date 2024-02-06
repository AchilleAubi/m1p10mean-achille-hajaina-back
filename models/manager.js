const mongoose = require('mongoose');

const managerSchema = mongoose.Schema(
    {
        UserId: {
            type: String,
            required: true
        },
        horaireTravail: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

const Employe = mongoose.model('Employe', managerSchema);

module.exports = Employe;