const {Router} = require("express")
const main_router = Router()
const main_ctrls = require("../contollers/main_controller")

main_router.get('/', main_ctrls.get_index)
main_router.get('/api/messages', main_ctrls.get_all_messages)

module.exports = main_router