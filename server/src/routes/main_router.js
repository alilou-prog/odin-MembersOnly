const {Router} = require("express")
const main_router = Router()
const main_ctrls = require("../contollers/main_controller")

main_router.get('/', main_ctrls.get_index)

module.exports = main_router