const express = require('express')
const app = express()
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
//mongoose.connect('mongodb://localhost/SEA', { useNewUrlParser: true, useUnifiedTopology: true })


app.use(cors())
app.use(express.json())
app.use(routes)
app.listen(process.env.PORT)