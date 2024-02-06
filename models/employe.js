const mongoose = require('mongoose');

const employeSchema = mongoose.Schema(
    {
        UserId: {
            type: String,
            required: true
        },
        specialisation: {
            type: String
        },
        password: {
            type: String
        },
        salaire: {
            type: number,
            default: 1200
        }
    },
    {
        timestamps: true,
    }
);

const Employe = mongoose.model('Employe', employeSchema);

module.exports = Employe;