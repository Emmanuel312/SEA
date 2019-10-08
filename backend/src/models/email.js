const { Schema,model } = require('mongoose')

const emailSchema = new Schema(
{
    from:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    to:
    {
        type: String,
        required: true
    },
    subject:
    {
        type: String,
        required: true
    },
    body:
    {
        type: String,
        required: true
    },

})

module.exports = model('Email',emailSchema)