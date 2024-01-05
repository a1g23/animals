// Import dependencies

const express = require("express")
const Animal = require("../models/Animal")

// Create the router

const router = express.Router()

// Routes

// seed route

router.get("/seed", async (req, res) => {

    try {
        // Bard.ai to generate JSON of 5 animals in Schema
        const startAnimals = [
            {
                species: "Loxodonta africana",
                extinct: false,
                location: "Africa",
                lifeExpectancy: 60,
            },
            {
                species: "Raphus cucullatus",
                extinct: true,
                location: "Mauritius (formerly)",
                lifeExpectancy: 10,
            },
            {
                species: "Ailuropoda melanoleuca",
                extinct: false,
                location: "China",
                lifeExpectancy: 20,
            },
            {
                species: "Balaenoptera musculus",
                extinct: false,
                location: "Oceans worldwide",
                lifeExpectancy: 80,
            },
            {
                species: "Varanus komodoensis",
                extinct: false,
                location: "Komodo Island, Indonesia",
                lifeExpectancy: 40,
            },
            ]

        // delete all animals
        await Animal.deleteMany({})

        // seed my starter animals
        const animals = await Animal.create(startAnimals)

        // response
        res.json(animals)

    } catch(error) {
        console.log(error.message)
    }


})






module.exports = router