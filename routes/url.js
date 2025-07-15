const express = require("express");
const UrlController=require("../controllers/url")
const router = express.Router();
const validateRequest=require("../validators/validateRequest");
const {createUrlSchema,updateUrlSchema, shortCodeCheck} = require('../validators/dtos');
const {tryCatch}=require("../utils/tryCatch");
const authenticateApp = require("../middlewares/authenticate");

    /**
     * @openapi
     * /short-url:
     *  get:
     *   tags:
     *    - URL
     *   summary: Retrieves all URLs from the DB.
     *   responses:
     *     200:
     *       description: List of short URLs.
     *       content:
     *         application/json:
     *           schema:
     *             type: array
     *             items:
     *               $ref: '#/components/schemas/URL'
     *     500:
     *       description: Something went wrong.    
     * 
     */
router.get('/',tryCatch(UrlController.getAllURLs));
/**
 * @openapi
 * /short-url:
 *   post:
 *     tags:
 *       - URL
 *     summary: Creates a new URL.
 *     description: Takes original_url, and optional custom_alias in query params.
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/createURL"
 *           example:
 *             original_url: "https://www.amazon.com"
 *             custom_alias: "tester"

 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/URL'
 *       400:
 *         description: Original_url required
 *       500:
 *         description: Something went wrong
 */

router.post('/',validateRequest(createUrlSchema),tryCatch(UrlController.createURL));
     /**
     * @openapi
     * /short-url/{short_code}:
     *   get:
     *     tags:
     *       - URL
     *     summary: Retrieves a URL based on its unique short_code and redirects to the original URL.
     *     parameters:
     *       - name: short_code
     *         in: path
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       302:
     *         description: Retrieved successfully and redirected.
     *       404:
     *         description: No URL exists with this specific short code 
     *       500:
     *         description: Something went wrong
     */
router.get("/:short_code",validateRequest(shortCodeCheck,'params'),tryCatch(UrlController.getURLByShort));
    /**
     * @openapi
     * /short-url/{short_code}:
     *   put:
     *     tags:
     *       - URL
     *     summary: Updates an entry in the database based on its unique short_code.
     *     parameters:
     *       - in: path
     *         name: short_code
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/createURL'
     *           example:
     *             original_url: "https://www.amazon.com"
     *             custom_alias: "tester"
     *     responses:
     *       200:
     *         description: Updated successfully.
     *         
     *       404:
     *         description: No URL exists with this specific short code. 
     *       500:
     *         description: Something went wrong.
     */
router.put("/:short_code",validateRequest(updateUrlSchema),tryCatch(UrlController.updateURLByShort));
    /**
     * @openapi
     * /short-url/{short_code}:
     *   delete:
     *     tags:
     *       - URL
     *     summary: Deletes an entry in the database based on its unique short_code.
     *     parameters:
     *       - in: path
     *         name: short_code
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Deleted successfully.
     *       404:
     *         description: No URL exists with this specific short code. 
     *       500:
     *         description: Something went wrong.
     */
router.delete("/:short_code",validateRequest(shortCodeCheck,'params'),tryCatch(UrlController.deleteURLByShort));


module.exports = router;
