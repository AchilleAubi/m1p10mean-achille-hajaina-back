const mongoose = require('mongoose');

const sousCategorieSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter a name"]
        },
        description: {
            type: String
        },
        dure: {
            type: Number
        },
        prix: {
            type: Number
        },
        commision: {
            type: Number
        },
        id_Categorie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categorie'
        }
    },
    {
        timestamps: true
    }
)

const SousCategorie = mongoose.model('SousCategorie', sousCategorieSchema);

module.exports = SousCategorie;