const appRepo = require("../repositories/appRepo.js");
const {v4:uuidv4} = require("uuid");
const { nanoid } = require('nanoid');
const { URL_NOT_FOUND, CUSTOM_ALIAS_EXISTS } = require("../constants/errorCodes.js");
const AppError = require("../utils/appError.js")

class appService{
    async getAllTokens(){
        return await entityRepo.fetchAll();
    }

    async existId(entity_id){
        return await entityRepo.exists(entity_id);
    }
    async registerApp(base_url, name) {
        // Check if app already exists
        const existingApp = await appRepo.findByName(name);
        if (existingApp) return existingApp;

        const token = nanoid(16);
        const appData = { base_url, name, token };
        return await appRepo.create(appData);
    }
    async authenticate(token) {
        return await appRepo.findByToken(token);
    }

}
module.exports = new appService();