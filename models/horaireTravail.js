const mongoose = require('mongoose');

const horaireTravailSchema = mongoose.Schema(
    {
        dateTimeDebut: {
            type: Date
        },
        dateTimeFin: {
            type: Date
        },
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }
);

const HorairTravail = mongoose.model('HorairTravail', horaireTravailSchema);

module.exports = HorairTravail;