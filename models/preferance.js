const mongoose = require('mongoose');

const preferanceSchema = mongoose.Schema(
    {
        Client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        Service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        },
        Employe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }
);

const Preferance = mongoose.model('Preferance', preferanceSchema);

module.exports = Preferance;