const AssistantV2 = require('ibm-watson/assistant/v2')
const { IamAuthenticator } = require('ibm-watson/auth')
const { apikey,url,version } = require('./credentials')

const assistant = new AssistantV2(
{
    authenticator: new IamAuthenticator({ apikey }),
    url,
    version
})

module.exports = assistant