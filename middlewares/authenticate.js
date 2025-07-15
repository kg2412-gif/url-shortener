const appService = require("../services/appService");
const AppError = require("../utils/appError");
const { AUTH_REQUIRED, INVALID_TOKEN } = require("../constants/errorCodes.js");

async function authenticateApp(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
      throw new AppError(AUTH_REQUIRED, "Authorization token is missing", 401);
    }

    const app = await appService.authenticate(token);
    if (!app) {
      throw new AppError(INVALID_TOKEN, "Invalid or expired token", 403);
    }

    req.appContext = app; 
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authenticateApp;