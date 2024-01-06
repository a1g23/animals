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

// edit route (get "/:id/edit" to a edit.ejs form)

router.get("/:id/edit", async (req, res) => {
    try {
        // get the id
        const id = req.params.id

        // find the animal in db
        const indyAnimal = await Animal.findById(id)

        // send the indyAnimal to the edit.ejs
        res.render("edit.ejs", {indyAnimal})


    } catch(error) {
    console.log(error.message)
    }
})

// update route (PUT to "/:id" send to db and redirect to )

router.put("/:id", async (req, res) => {
    try {
        // handle the booelean
        req.body.extinct = req.body.extinct === "on" ? true : false

        // find the id
        const id = req.params.id

        // edit animal
        const updatedAnimal = req.body

        // change the database
        await Animal.findByIdAndUpdate(id, updatedAnimal)

        // redirect to the animal that was edited
        res.redirect(`/animals/${id}`)

    } catch(error) {
    console.log(error.message)
    }
})

// delete route (Delete to "/:id remove from db and redirect")

router.delete("/:id", async (req, res) => {
    try {
        // find the id
        const id = req.params.id

        // delete from the database
        await Animal.findByIdAndDelete(id)

        //redirect to main
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