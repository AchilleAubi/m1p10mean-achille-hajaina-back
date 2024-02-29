const PorteFeuille = require('../models/porteFeuille');

const porteFeuilleServices = {

    async getByIdUtilisateur(id) {
        try {
            const porteFeuille = await PorteFeuille.find({ User: id });
            return porteFeuille;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async getSoldeByIdUtilisateur(id) {
        try {
            let solde = 0;
            let entrer = 0;
            let sortie = 0;
            const porteFeuille = await this.getByIdUtilisateur(id);
            for (const item of porteFeuille) {
                entrer = entrer + item.entrer;
                sortie = sortie + item.sortie;
            }
            solde = entrer - sortie;
            return solde;
        } catch (error) {
            console.log(error);
            throw new error(error.message);
        }
    },

    async depotSolde(body) {
        try {
            let result = 'Depot Solde Eroored';
            const porteFeuilles = [];
            for (const item of body) {
                if (item.entrer >= 0 && item.sortie == 0 && item.User != '') {
                    const portefeuille = item;
                    porteFeuilles.push(portefeuille);
                    result = 'Depot Sold Succes';
                }
                // for (const key in item) {
                //     porteFeuille[key] = item[key];
                //     console.log('porteFeuille[key]', key, porteFeuille[key]);
                // }
            }
            const achat = await PorteFeuille.create(porteFeuilles);
            return achat;
        } catch (error) {
            throw new error(error.message);
        }
    },

    async achat(body) {
        try {
            let result = 'Achat Eroored';
            const porteFeuilles = [];
            for (const item of body) {
                if (item.sortie >= 0 && item.entrer == 0 && item.User != '') {
                    const portefeuille = item;
                    porteFeuilles.push(portefeuille);
                    result = 'Achat Succes';
                }
                // for (const key in item) {
                //     porteFeuille[key] = item[key];
                //     console.log('porteFeuille[key]', key, porteFeuille[key]);
                // }
            }
            const achat = await PorteFeuille.create(porteFeuilles);
            return result;
        } catch (error) {
            throw new error(error.message);
        }
    }
}

module.exports = porteFeuilleServices;