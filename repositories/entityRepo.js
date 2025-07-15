const entityURL = require("../models/entityURL");


async function create(urlData) {
    return entityURL.create(urlData);
}

module.exports = {
    create
};