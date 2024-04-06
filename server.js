const express = require('express')
const routes = require('./routes/routes')
const app = express()

const port = 3000

app.use(express.urlencoded({extended: false}))
app.use(express.static('./frontend'))
app.use(express.json())
app.use("/", routes)

app.listen(3000, console.log(`Server is listening on port ${port}`))