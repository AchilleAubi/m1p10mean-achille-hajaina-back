const ServiceSalonServices = require('../services/serviceSalonServices');
const ImageServices = require('../services/imageServices');
const asyncHandler = require('express-async-handler');

const serviceSalonController = {
    getSousCategorie: asyncHandler(async (req, res) => {
        try {
            const sousCategories = await ServiceSalonServices.getService();
            res.status(200).json(sousCategories);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    getSousCategorieByID: asyncHandler(async (req, res) => {
        try {
            const idSousCategorie = req.params.id;
            const sousCategories = await ServiceSalonServices.getServiceByID(idSousCategorie);
            res.status(200).json(sousCategories);
        } catch (error) {
            res.status(500);
            throw new error(error.message);
        }
    }),

    createSousCategorie: asyncHandler(async (req, res) => {
        try {
            const io = req.app.get('io');
            for (let index = 0; index < req.body.length; index++) {
                const sousCategories = await ServiceSalonServices.createService(req.body[index]);
                io.emit('newSousCategoryAdded', sousCategories);
            }
            res.status(200).json("Insert ok");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }),

    getSousCategorieByIDCategorie: asyncHandler(async (req, res) => {
        try {
            const sousCategories = await ServiceSalonServices.getServiceByIDCategorie(req.params.idCategorie);
            res.status(200).json(sousCategories);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }),

    getTopSousCategorie: asyncHandler(async (req, res) => {
        try {
            const sousCategories = await ServiceSalonServices.getService();
            res.status(200).json(sousCategories);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }),

    createImageService: asyncHandler(async (req, res) => {
        try {
            const images = await ImageServices.createImageService(req.body);
            res.status(200).json(images);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }),
}

module.exports = serviceSalonController;