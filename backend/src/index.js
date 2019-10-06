const express = require('express')
const app = express()
const assistant = require('./services/assistant')
const { workspaceId } = require('./services/credentials')

assistant.message(
{
    input: { text: "Eae" },
    workspaceId
}).then(response => {
    console.log(JSON.stringify(response.result.output.text, null, 2))
}).catch(err => {
    console.log(err)
});




app.use(express.json())
app.listen(3000, console.log('server on port 3000'))