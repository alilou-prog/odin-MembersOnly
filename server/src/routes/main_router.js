const {Router} = require("express")
const main_router = Router()
const main_ctrls = require("../contollers/main_controller")

main_router.get('/', main_ctrls.get_index)
main_router.get('/api/messages', main_ctrls.get_all_messages)

main_router.post('/api/users', main_ctrls.sign_up_user);
main_router.get('/api/users/log-in', main_ctrls.check_already_auth)
main_router.post('/api/users/log-in', main_ctrls.log_in_user)

module.exports = main_router