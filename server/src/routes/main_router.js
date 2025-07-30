const { Router } = require("express")
const main_router = Router()
const main_ctrls = require("../contollers/main_controller")
const { auth_action } = require("../lib/passport_utils")

main_router.get('/', main_ctrls.get_index)

main_router.post('/api/users', main_ctrls.sign_up_user);
main_router.get('/api/users/check-auth', main_ctrls.check_already_auth)
main_router.post('/api/users/login', main_ctrls.log_in_user)
main_router.delete('/api/users/logout', main_ctrls.logout)

main_router.post('/api/users/become-member', main_ctrls.become_member)

main_router.get('/api/messages', main_ctrls.get_all_messages)
main_router.post('/api/messages', auth_action(main_ctrls.create_message))
main_router.put('/api/messages/:message_id', auth_action(async (req, res) => await main_ctrls.update_message(req, res, req.params.message_id)))
main_router.delete('/api/messages/:message_id', auth_action(async (req, res) => await main_ctrls.delete_message(req, res, req.params.message_id)))


module.exports = main_router