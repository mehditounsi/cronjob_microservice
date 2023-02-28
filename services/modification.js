const { Societe } = require('../models')
const configuration = require('../config/config')

const Logger = require('winston')

const https = require("https");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


exports.editSociete = async () => {
    try {
        let societe = await Societe.find({ to_update: 1 })
        if (societe.length > 0){
        for (let i = 0; i < societe.length; i++) {
            if (societe[i] && societe[i].rc) {
                const httpsAgent = new https.Agent({
                    maxVersion: "TLSv1.2",
                    minVersion: "TLSv1.2",
                    rejectUnauthorized: false
                })
                let body
                let current_date = new Date()
                let difference = Math.abs(current_date - societe[i].date_maj);
                let diffDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
                if ((diffDays > 30 || !societe.date_maj)) {
                    if (societe[i].type == "P") {
                        let adr = configuration.url.societe_url + "pp" + "/" + societe[i].rc

                        const response = await fetch(adr, { httpsAgent });

                        body = await response.json();

                    }
                    if (societe[i].type == "M") {
                        let adr = configuration.url.societe_url + "pm" + "/" + societe[i].rc

                        const response = await fetch(adr, { httpsAgent });

                        body = await response.json();

                    }
                    if (body) {
                        let update = {
                            type: body.typeRegistre,
                            nom_ar: body.denominationAr,
                            nom_fr: body.denominationLatin,
                            adresse_fr: body.villeSiegeFr,
                            adresse_ar: body.villeSiegeAr,
                            date_maj: new Date(),
                            to_update: 0
                        }
                        if (update) {
                            let updated_societe = await Societe.update(societe[i].id, update)
                            Logger.info("mettre à jour société", updated_societe)
                        } else {
                            Logger.error("rien à mettre à jour")
                        }
                    } else {
                        Logger.error("pas de données fournies")
                    }
                } else {
                    Logger.error("Moins d'un mois depuis la dernière mise à jour")
                }
            } else {
                Logger.error("pas de societe trouvé")
            }
        } 
    } else {
        Logger.error("pas de societe à modifier")
    }
    } catch (error) {
        console.log(error);
        throw new error
    }
}