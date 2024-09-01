import { Router } from "express";
import * as SC from "./specials.controller.js"

const router = Router() 

//Get all cars whose model is ‘Honda’ and ‘Toyota’ 
router.get("/special1" , SC.specialHondaTayota)

//get Available Cars of a Specific Model.
router.get("/special2" , SC.availableCarsSpecificModel)

//Get Cars that are Either rented or of a Specific Model
router.get("/special3" , SC.RentedOrSpecificModel)


//Get Available Cars of Specific Models or Rented Cars of a Specific Model
router.get("/special4", SC.SpecificModelRentedOrAvailable)

export default router