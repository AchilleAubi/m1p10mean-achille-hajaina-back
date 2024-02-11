const Images = require('../models/images');

const imageServices = {

    async getImagesByIDService(idService) {
        try {
            const images = await Images.find({ idService: idService });
            return images;
        } catch (error) {
            throw new error(error.message);
        }
    },

    async createImageService(imageBody) {
        try {
            const services = await Images.create(imageBody);
            return services;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    }
}

module.exports = imageServices;