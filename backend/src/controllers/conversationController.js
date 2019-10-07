const { workspaceId } = require('../services/credentials')
const assistant = require('../services/assistant')

module.exports = 
{
    async sendMessage(req,res)
    {
        try 
        {
            const { msg, context = {} } = req.body
            const params = 
            {
                input: { text: msg },
                workspaceId,
                context
            }
            const watsonResponse = await assistant.message(params)

            res.status(200).json(watsonResponse)
        }
        catch (err)
        {
            res.status(err.status).json(err)
        }        
    }
}