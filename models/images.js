const mongoose = require('mongoose');

const imagesShema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter a name"]
        },
        idCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categorie'
        },
        idService: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        }
    },
    {
        timestamps: true
    }
)

const Images = mongoose.model('Images', imagesShema);

module.exports = Images;