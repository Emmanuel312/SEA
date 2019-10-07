const { Router } = require('express')
const routes = Router()
const conversationController = require('./controllers/conversationController')
const authMiddleware = require('./middlewares/auth')


routes.post('/start', conversationController.createSession)

// middleware de session
routes.use(authMiddleware)
// rotas abaixo estao autenticadas
routes.post('/conversation', conversationController.sendMessage)

module.exports = routes