const express = require("express");
const entityController=require("../controllers/entity")
const router = express.Router();
const validateRequest=require("../validators/validateRequest");
const {entityShortCheck,createEntitySchema} = require('../validators/dtos');
const {tryCatch}=require("../utils/tryCatch");
const authenticateApp = require("../middlewares/authenticate");

/**
 * @openapi
 * /entity:
 *   post:
 *     tags:
 *       - Entity
 *     summary: Creates a new URL.
 *     description: Takes original_url,entity_type and entity_id in query params.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/createEntity"
 *           example:
 *             original_url: "https://www.amazon.com"
 *             entity_type: "Electronics"
 *             entity_id: "100000000"
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entity'
 *       400:
 *         description: Original_url required
 *       500:
 *         description: Something went wrong
 */

router.post('/',authenticateApp,tryCatch(entityController.createURL));


module.exports = router;
