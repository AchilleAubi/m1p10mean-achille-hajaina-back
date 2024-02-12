const mongoose = require('mongoose');

const emploiesSchema = mongoose.Schema(
    {
        matricule: {
            type: String
        },
        domaine: {
            type: String
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

const Emploies = mongoose.model('Emploies', emploiesSchema);

module.exports = Emploies;