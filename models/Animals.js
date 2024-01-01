// dependencies
const { timeStamp } = require("console")
const mongoose = require("../config/db.js") // we need the connection to the database

// creating the model/schema of the data

const animalSchema = new mongoose.Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number,
}, {timeStamp: true})

// create the model with the Schema

const Animal = mongoose.model("Animal", animalSchema)

// export the Animal Model for use

module.exports = Animal



