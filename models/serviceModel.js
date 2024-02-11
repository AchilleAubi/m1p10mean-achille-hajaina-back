const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
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
        },
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

const ServiceModel = mongoose.model('Service', serviceSchema);

module.exports = ServiceModel;