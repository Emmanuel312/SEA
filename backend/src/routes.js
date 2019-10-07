const { Router } = require('express')
const routes = Router()
const conversationController = require('./controllers/conversationController')

routes.post('/conversation', conversationController.sendMessage )

module.exports = routes