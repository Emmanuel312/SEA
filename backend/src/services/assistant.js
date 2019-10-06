const AssistantV1 = require('ibm-watson/assistant/v1')
const { IamAuthenticator } = require('ibm-watson/auth')
const { apikey,url,version } = require('./credentials')

const assistant = new AssistantV1(
{
    authenticator: new IamAuthenticator({ apikey }),
    url,
    version
})



module.exports = assistant