const mongoose = require('mongoose');

const offreSpecialeSchema = mongoose.Schema(
    {
        Service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        },
        dateDebut: {
            type: Date,
            default: Date.now
        },
        dateFin: {
            type: Date
        },
        pourcentage: {
            type: Number
        },
        vue: {
            type: Boolean,
            default: true
        },
        titre: {
            type: String
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

const OffreSpeciale = mongoose.model('OffreSpeciale', offreSpecialeSchema);

module.exports = OffreSpeciale;