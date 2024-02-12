const mongoose = require('mongoose');

const porteFeuilleSchema = mongoose.Schema(
    {
        entrer: {
            type: Number,
            default: 0
        },
        sortie: {
            type: Number,
            default: 0
        },
        date: {
            type: Date,
            default: Date.now
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

const PorteFeuille = mongoose.model('PorteFeuille', porteFeuilleSchema);

module.exports = PorteFeuille;