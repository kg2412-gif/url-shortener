const entityURL = require("../models/entityURL");
const appService = require("../services/appService.js");
const { URL_NOT_FOUND, CUSTOM_ALIAS_EXISTS } = require("../constants/errorCodes.js");
const AppError = require("../utils/appError.js");


class appController{
  async register(req, res) {
        const { name, base_url } = req.body;
        if (!name || !base_url) return res.status(400).json({ message: "name and base_url required" });

        const app = await appService.registerApp(base_url, name);
        res.status(201).json(app);
    }

}
module.exports= new appController();