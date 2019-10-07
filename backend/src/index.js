const express = require('express')
const app = express()
const routes = require('./routes')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/SEA', { useNewUrlParser: true, useUnifiedTopology: true })



app.use(express.json())
app.use(routes)
app.listen(3000, console.log('server on port 3000'))