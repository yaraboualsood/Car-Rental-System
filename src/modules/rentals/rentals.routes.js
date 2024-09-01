import { Router } from "express";
import * as RC from "./rentals.controller.js"

const router = Router() 

//createRental
router.post("/rentals" , RC.createRental)

//update car
router.put("/rentals/:id" , RC.updateRental)

//delete rental
router.delete("/rentals/:id", RC.deleteRental)

//get specific rental
router.get("/rentals/:id", RC.getRental)

//get all rentals
router.get("/rentals" , RC.getAllRentals)


export default router