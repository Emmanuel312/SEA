const { promisify } = require('util')
const assistant = require('../services/assistant')
const { assistantId } = require('../services/credentials')
const { secret } = require('../config/auth')
const jwt = require('jsonwebtoken')
const nodeMailerService = require('../services/sendEmail')

module.exports = 
{
    async createSession(req,res)
    {
        try
        {
            const session = await assistant.createSession({ assistantId })
            const token = await promisify(jwt.sign)({ sessionId: session.result.session_id }, secret , { expiresIn: '1d' })
            
            return res.status(200).json({ success: true, token })

            
        }
        catch(err)
        {
            res.json(err)
        }
    },

    async sendMessage(req,res)
    {
        try 
        {
            const { msg } = req.body
            
            if(!req.sessionId) return res.status(404).json({ error: 'sessionId nao encontrado' })
            
            const params = 
            {
                input: { text: msg, options: { return_context: true } },
                assistantId,
                sessionId: req.sessionId
            }
            
            const watsonResponse = await assistant.message(params)
           
            res.status(200).json(watsonResponse.result)
        }
        catch (err)
        {
            res.json(err)
        }        
    },

    // rota vai ser chamada quando a watsonResponse.result.intents conter "intent": "confirmo_envio",
    async sendEmail(req,res)
    {
        try
        {
            const { to,from,password,subject,body } = req.body
            const data = 
            {
                user: from,
                pass: password,
                from,
                to,
                subject,
                text: body
            }
    
            const info = await nodeMailerService(data)
            
            const deleteSession = await assistant.deleteSession(
            {
                assistantId,
                sessionId: req.sessionId
            })
            console.log(deleteSession)
            res.status(200).json(info)
    
        }
        catch(err)
        {
            res.json(err)
        }
    }
}