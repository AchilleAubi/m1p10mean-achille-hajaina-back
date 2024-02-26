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
        Service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        },
        dateTime: {
            type: Date
        },
        notes: {
            type: String
        },
        token: {
            type: String
        },
        etat: [{
            name: {
                type: String,
                default: 'En cours de validation'
            },
            color: {
                type: String,
                default: 'warning'
            },
            date: {
                type: Date,
                default: Date.now
            }
        }],
        payer: {
            type: Number
        },
        verified: {
            type: Boolean,
            default: false
        },
        cancel: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const RendezVous = mongoose.model('RendezVous', rendezVousSchema);

module.exports = RendezVous;