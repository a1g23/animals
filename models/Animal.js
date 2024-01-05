// dependencies
const mongoose = require("./db.js") // we need the connection to the database

// creating the model/schema of the data

const animalSchema = new mongoose.Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number,
})

// create the model with the Schema

const Animal = mongoose.model("Animal", animalSchema)

// export the Animal Model for use

module.exports = Animal



