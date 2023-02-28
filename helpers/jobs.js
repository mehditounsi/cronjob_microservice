const nodeCron = require('node-cron');
const Logger = require("winston");
const rechercheService = require("../services/modification");

/*
# ┌────────────── second (optional)
# │ ┌──────────── minute
# │ │ ┌────────── hour
# │ │ │ ┌──────── day of month
# │ │ │ │ ┌────── month
# │ │ │ │ │ ┌──── day of week
# │ │ │ │ │ │
# │ │ │ │ │ │
# * * * * * *
*/

// Edit societe chaque heure
nodeCron.schedule("*/60 * * * *", async () => { 
    try {
        Logger.info("Edit societe job started");
        rechercheService.editSociete()
    } catch (error) {
        Logger.error("Error " + error);
    }
});