const path = require('path')
const db = require('../models/queries')

function get_index(req, res) {
    res.sendFile("../public/index.html")
}

async function get_all_messages(req, res) {
    res.json(await db.get_all_messages());
}

module.exports = {
    get_index,
    get_all_messages,
}