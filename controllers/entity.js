const entityURL = require("../models/entityURL");
const { v4: uuid } = require('uuid');
const entityServices = require("../services/entityService.js");
const { URL_NOT_FOUND } = require("../constants/errorCodes.js");
const AppError = require("../utils/appError.js");


class entityController{

  async createURL(req,res){
        const app = req.appContext;
        const id=uuid();

        const { entity_type, entity_id, product_type, extra_params } = req.body;

        const shortURL = await entityServices.createUrl({
            id,
            original_url:app.base_url,
            entity_type,
            entity_id,
            product_type,
            extra_params,
            expiration_date: req.body.expiration_date || null,
            app
        });

    res.status(201).json(shortURL);
  }
    
}
module.exports= new entityController();