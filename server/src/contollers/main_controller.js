const path = require('path')
const db = require('../models/queries')
const { gen_password } = require("../lib/passport_utils")

function get_index(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
}

async function get_all_messages(req, res) {
    const messages = await db.get_all_messages();
    if (req.user) {
        res.json(messages);
    }
    else {
        res.json(messages.map(message => { return { id: message.id, title: message.title, text: message.text } }))
    }
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
        if (req.isAuthenticated()) {
            res.json({ user: req.user, is_auth: true, msg: "Authenticated successfully" })
        }
        else {
            res.json({ user: null, is_auth: false, msg: "Authenticatin failed" })
        }
    }
]

function check_already_auth(req, res) {
    if (req.isAuthenticated()) {
        res.json({ user: req.user, is_auth: true, msg: "Already authenticated" });
    }
    else {
        res.json({ user: null, is_auth: false, msg: "Session not found" })
    }
}

function logout(req, res, next) {
    req.logout((err) => {
        if (err) {
            res.json({ is_logout: false, err })
        }
    });
    res.json({ is_logout: true, err: null })
}

async function create_message(req, res) {
    await db.create_message({...req.body, user_id: req.user.id})
    res.end()
}

async function update_message(req, res, id) {
    await db.update_message({...req.body, id})
    res.end()
}

async function delete_message(req, res, id) {
    await db.delete_message(id)
    res.end()
}

module.exports = {
    get_index,
    get_all_messages,
    sign_up_user: [...validate_user, sign_up_user],
    log_in_user,
    check_already_auth,
    logout,
    create_message,
    update_message,
    delete_message
}