const ShortURL = require("../models/ShortURL");


async function fetchAll() {
    return ShortURL.find({});
}

async function exists(short_code) {
    return ShortURL.findOne({short_code});
}

async function fetchOneByShort(short_code) {
    return ShortURL.findOne({short_code});
}

async function create(urlData) {
    return ShortURL.create(urlData);
}

async function updateByShort(short_code, updateData) {
    return ShortURL.findOneAndUpdate({ short_code }, updateData, { new: true });
}

async function deleteByShort(short_code) {
    return ShortURL.findOneAndDelete({ short_code });
}

module.exports = {
    fetchAll,
    fetchOneByShort,
    create,
    updateByShort,
    deleteByShort,
    exists
};