const urlRepo = require("../repositories/urlRepo");
const {v4:uuidv4} = require("uuid");
const { nanoid } = require('nanoid');
const {fetchAll,fetchOneByShort,create,updateByShort,deleteByShort,exists} = require("../repositories/urlRepo");
const { URL_NOT_FOUND, CUSTOM_ALIAS_EXISTS } = require("../constants/errorCodes.js");
const AppError = require("../utils/appError.js")

class URLServices{
    async getAllURLs(){
        return await urlRepo.fetchAll();
    }

    async existShort(short_code){
        return await urlRepo.exists(short_code);
    }

    async createUrl(original_url, custom_alias) {
        let ShortID;
        if(custom_alias){
            const exists = await urlRepo.exists(custom_alias);
            if (exists) {
                throw new AppError(CUSTOM_ALIAS_EXISTS,"Custom alias already exsits",400);
            }
            ShortID = custom_alias;
        }
        else{
            while (true) {
                ShortID = nanoid(11);
                const exists = await urlRepo.exists(ShortID);
                if (!exists) break;
            }
        }
        const newURL={
                    short_code:ShortID,
                    original_url:original_url,
                    user_id: uuidv4(),
                    ...(custom_alias && { custom_alias })
                };  
        return await urlRepo.create(newURL);
    }

    async getURLByShort(short_code) {
        return await urlRepo.fetchOneByShort(short_code);
    }

    async updateURL(short_code, updateData) {
        return await urlRepo.updateByShort(short_code, updateData);
    }

    async deleteURL(short_code) {
        return await urlRepo.deleteByShort(short_code);
    }
}
module.exports = new URLServices();