import { Router } from "express";
import * as CC from "./cars.controller.js"

const router = Router() 

//add car
router.post("/cars" , CC.addCar)

//get specific car
router.get("/cars/:id", CC.getCar)

//get all cars
router.get("/cars" , CC.getAllCars)

//update car
router.put("/cars/:id" , CC.updateCar)

//delete car
router.delete("/cars/:id", CC.deleteCar)


export default router