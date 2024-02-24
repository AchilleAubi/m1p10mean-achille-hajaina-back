const mongoose = require('mongoose');

const journaleCaisseShema = mongoose.Schema(
    {
        dateTime: {
            type: Date,
            default: Date.now
        },
        entrerMontant: {
            type: Number
        },
        sortiMontant: {
            type: Number
        },
        libelle: {
            type: String
        },
        RendezVous: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RendezVous'
        }
    },
    {
        timestamps: true
    }
)

const JournaleCaisse = mongoose.model('JournaleCaisse', journaleCaisseShema);

module.exports = JournaleCaisse;