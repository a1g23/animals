// dependencies
require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")

const app = express()
const PORT = process.env.PORT || 3013


//middleware

app.use(morgan("dev")) // to help with errors
app.use(methodOverride("_method")) // for the delete and puts
app.use(express.urlencoded({extended: true})) // for body parsing













app.listen(3000, () => console.log(`listening on ${PORT}`))