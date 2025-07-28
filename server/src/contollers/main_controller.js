const path = require('path')
const db = require('../models/queries')

function get_index(req, res) {
    console.log(req.session)
    res.render("index")
}

async function get_all_messages(req, res) {
    res.json(await db.get_all_messages());
}

const { body, validationResult } = require("express-validator");
const validate_user = [
    body("confirm_password")
        .trim()
        .custom((value, {req}) => {
            if(value !== req.body.password) {
                throw new Error("Confirm passowrd does not match")
            };
            return true;
        }),
];
async function sign_up_user(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(400).json({errors: errors.array()})
    }
    await db.create_user({...req.body, is_admin: req.body.is_admin ? true : false});
    res.status(201).end();
}


module.exports = {
    get_index,
    get_all_messages,
    sign_up_user: [...validate_user, sign_up_user]
}