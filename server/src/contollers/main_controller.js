const path = require('path')
const db = require('../models/queries')
const { gen_password } = require("../lib/passport_utils")

function get_index(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
}

async function get_all_messages(req, res) {
    res.json(await db.get_all_messages());
}

const { body, validationResult } = require("express-validator");
const passport = require('passport');
const validate_user = [
    body("confirm_password")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Confirm passowrd does not match")
            };
            return true;
        }),
];
async function sign_up_user(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(400).json({ errors: errors.array() })
    }
    const { hash, salt } = gen_password(req.body.password)
    await db.create_user({
        ...req.body,
        is_admin: req.body.is_admin ? true : false,
        password: hash,
        salt
    });
    res.status(201).end();
}

const log_in_user = [
    passport.authenticate('local'),
    (req, res) => {
        if(req.isAuthenticated()) {
            res.json({user: req.user, is_auth: true, msg: "Authenticated successfully"})
        }
        else {
            res.json({user: null, is_auth: false, msg: "Authenticatin failed"})
        }
    }
]

function check_already_auth(req, res) {
    if (req.isAuthenticated()) {
        res.json({user: req.user, is_auth: true, msg: "Already authenticated"});
    }
    else {
        res.json({user: null, is_auth: false, msg: "Session not found"})
    }
}

module.exports = {
    get_index,
    get_all_messages,
    sign_up_user: [...validate_user, sign_up_user],
    log_in_user,
    check_already_auth,
}