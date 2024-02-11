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
        service: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        }],
        image: [
            {
                name: {
                    type: String
                }
            }]
    },
    {
        timestamps: true
    }
)

const Categorie = mongoose.model('Categorie', categorieShema);

module.exports = Categorie;