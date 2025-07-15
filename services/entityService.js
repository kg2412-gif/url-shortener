const entityRepo = require("../repositories/entityRepo.js");
const {v4:uuidv4} = require("uuid");
const { nanoid } = require('nanoid');
const {create} = require("../repositories/entityRepo");
const { URL_NOT_FOUND, CUSTOM_ALIAS_EXISTS } = require("../constants/errorCodes.js");
const AppError = require("../utils/appError.js")

class entityServices{

    async createUrl({ id,original_url, entity_type, entity_id, product_type, extra_params, app }) {
        const existing = await entityRepo.exists(entity_id);
        if (existing) return existing;

        let ShortID;
        while (true) {
            ShortID = nanoid(8);
            const exists = await entityRepo.fetchOneByShort(ShortID);
            if (!exists) break;
        }

        const newURL = {
            short_code: ShortID,
            original_url,
            entity_type,
            entity_id,
            product_type,
            extra_params,
            user_id: app._id 
        };

        return await entityRepo.create(newURL);
        }
}
module.exports = new entityServices();