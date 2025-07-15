const express = require("express");
const appController=require("../controllers/app")
const router = express.Router();
const {tryCatch}=require("../utils/tryCatch");
const { registerAppSchema } = require("../validators/dtos");
const validateRequest = require("../validators/validateRequest");

/**
 * @openapi
 * /app/register:
 *   post:
 *     tags:
 *       - App
 *     summary: Register a new app
 *     description: Registers a new application and returns a unique token for authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/App'
 *           example:
 *             name: "MyApp"
 *             base_url: "https://myapp.com"
 *     responses:
 *       201:
 *         description: App registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/App'
 *       400:
 *         description: name and base_url required
 *       500:
 *         description: Internal server error
 */

router.post("/register", validateRequest(registerAppSchema),tryCatch(appController.register));
module.exports = router;
