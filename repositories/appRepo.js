const app = require("../models/app");


async function create(appData) {
    return await app.create(appData);
}

async function findByName(name) {
    return await app.findOne({ name });
}

async function findByToken(token) {
    return await app.findOne({ token });
}


module.exports = {
    create,
    findByName,
    findByToken
};