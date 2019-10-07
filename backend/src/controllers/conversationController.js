const { assistantId } = require('../services/credentials')
const assistant = require('../services/assistant')
const { secret } = require('../config/auth')
const jwt = require('jsonwebtoken')

module.exports = 
{
    async createSession(req,res)
    {
        try
        {
            const session = await assistant.createSession({ assistantId })
            const token = await jwt.sign({ sessionId: session.result.session_id }, secret , { expiresIn: '1d' })
            
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

    async sendEmail(req,res)
    {
        
        /* codigo para recuperar as variaveis de contexto do watson para montar o email
        const { sessionId } = req.body
        const params = 
        {
            input: { text: 'fim', options: { return_context: true } },
            assistantId,
            sessionId,
        }
        
        const watsonResponse = await assistant.message(params)
        */
        

    }
}