const mongoose = require('mongoose');

const rendezVousSchema = mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        Employe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        Service: [{
            idService: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Service'
            }
        }],
        dateTime: {
            type: Date
        },
        notes: {
            type: String
        },
        etat: [{
            name: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }]
    },
    {
        timestamps: true,
    }
);

const RendezVous = mongoose.model('RendezVous', rendezVousSchema);

module.exports = RendezVous;