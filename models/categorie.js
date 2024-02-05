const mongoose = require('mongoose');

const categorie = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter a name"]
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Categorie = mongoose.model('Categorie', categorie);

module.exports = Categorie;