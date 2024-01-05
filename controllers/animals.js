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

// index route (get -> / to database of animals)

router.get("/", async (req, res) => {
    try {
    // find the animals in the db
    const animals = await Animal.find({})
    // render the index.ejs page with the animals attached
    res.render("./index.ejs", {animals})
    } catch(error) {
    console.log(error.message)
    }
})

// new route (get -> /new to a form)

router.get("/new", (req, res) => {
    //pretty simply just need to rend the new.ejs
    res.render("new.ejs")

})

// create route (post -> / and update boolean)

router.post("/", async (req, res) => {
    try {
        // correct the boolean
        if (req.body.extinct === "on") {
            req.body.extinct = false
        } else {
            req.body.extinct = true
        }
        
        // grab the body
        const newAnimal = req.body

        // add it to the db
        await Animal.create(newAnimal)

        // redirect to animals
        res.redirect("/animals")

    } catch(error) {
    console.log(error.message)
    }
})








// show route (get -> /:id)

router.get("/:id", async (req, res) => {
    try {
    // get the ID
    const id = req.params.id

    // get the animal with that id
    const indyAnimal = await Animal.findById(id)

    // render show.ejs and send the indy animal
    res.render("./show.ejs", {indyAnimal})

    } catch(error) {
        console.log(error.message)
    }
})


module.exports = router