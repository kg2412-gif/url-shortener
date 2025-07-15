const ShortURL = require("../models/ShortURL");
const URLServices = require("../services/urlservice.js");
const { URL_NOT_FOUND, CUSTOM_ALIAS_EXISTS } = require("../constants/errorCodes.js");
const AppError = require("../utils/appError.js");


class UrlController{
  async getAllURLs(req,res){
      const shortURL = await URLServices.getAllURLs();
      res.status(200).json(shortURL); 
  }


  async createURL(req,res){
        const shortURL = await URLServices.createUrl(req.body.original_url,req.body.custom_alias);
        res.status(201).json(shortURL);
  }
    
  async getURLByShort(req,res){
      const shortURL = await URLServices.getURLByShort(req.params.short_code);
      res.redirect(shortURL.original_url);
  }

  async updateURLByShort(req,res){
        const shortURL = await ShortURL.findOne({ short_code: req.params.short_code });
        if (!shortURL) {
          throw new AppError(URL_NOT_FOUND,"URL not found",400);
        }
        const { custom_alias, ...updateData } = req.body;

        if (custom_alias) {
          const aliasExists = await URLServices.existShort(custom_alias);
        if (aliasExists) {
          throw new AppError(CUSTOM_ALIAS_EXISTS,"Custom alias already exsits",400);
        }
        updateData.short_code = custom_alias;
        updateData.custom_alias = custom_alias;
      }
      const updated = await URLServices.updateURL(req.params.short_code, updateData);
      res.status(200).json(updated);
  }

  async deleteURLByShort(req,res){
        const shortURL = await URLServices.deleteURL(req.params.short_code);
        if (!shortURL) {
          throw new AppError(URL_NOT_FOUND,"URL not found",400);
        }
        res.status(200).json({ message: "URL deleted succesfully" });
  }
}
module.exports= new UrlController();