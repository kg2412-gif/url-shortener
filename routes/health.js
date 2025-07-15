const express =require("express");
const mongoose =require("mongoose");
const router_health=express.Router();
const appDb = require("../config/appdb");
const entityDb = require("../config/entitydb");
const urlDb = require("../config/db"); 

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - Healthcheck
 *     description: Checks whether the MongoDB database is connected or not.
 *     responses:
 *       200:
 *         description: MongoDB is connected successfully and app is ready to run.
 *       500:
 *         description: MongoDB is not connected and therefore app is not ready to run.
 */


router_health.get("/", (req, res) => {
  const dbStates = {
    appDb: appDb.readyState,
    entityDb: entityDb.readyState,
    urlDb: urlDb.readyState
  };

  const isHealthy = Object.values(dbStates).every(state => state === 1);

  if (isHealthy) {
    console.log("All DBs are connected");
    res.status(200).json({ message: "All DBs are connected", dbStates });
  } else {
    console.error("One or more DBs are not connected:", dbStates);
    res.status(500).json({ message: "Some DBs are not connected", dbStates });
  }
});

module.exports = router_health;