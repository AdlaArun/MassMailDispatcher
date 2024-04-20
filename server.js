const express = require('express')
const routes = require('./routes/routes')
const app = express()
require('dotenv').config

const port = process.env.PORT || 5000

app.use(express.urlencoded({extended: false}))
app.use(express.static('./frontend'))
app.use(express.json())
app.use("/", routes)

app.listen(port, console.log(`Server is listening on port ${port}`))