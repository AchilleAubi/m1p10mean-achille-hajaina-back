const mongoose = require('mongoose');

const categorieShema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter a name"]
        },
        description: {
            type: String
        },
        sousCategories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SousCategorie'
        }]
    },
    {
        timestamps: true
    }
)

const Categorie = mongoose.model('Categorie', categorieShema);

module.exports = Categorie;