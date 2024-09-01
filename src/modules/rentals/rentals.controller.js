import { ObjectId } from "mongodb";
import db from "../../../DB/connectionDB.js"


//==========================================================CREATE RENTAL========================================================================
export const createRental = async (req, res, next) => {
    const { customerId, carId, returnDate, rentalDate } = req.body
    
    const isUser = await db.collection("customers").findOne({ _id: new ObjectId(customerId) })
    if (!isUser) {
        return res.status(404).json({ message: "user not found" })
    }
    const isCar = await db.collection('cars').findOne({ _id: new ObjectId(carId) })
    if (!isCar) {
        return res.status(404).json({ message: "car not found" })
    }
    if(isCar.rentalStatus!= "available"){
        return res.status(400).json({message: "car is not available"})
    }
   

    const availableCarForRental = await db.collection("cars").updateOne({ _id: new ObjectId(carId)}, {$set: {rentalStatus: "rented"}})

    const rentals = await db.collection("rentals").insertOne({ 
        customerId: new ObjectId(customerId),
        carId: new ObjectId(carId),
        returnDate: new Date(returnDate),
        rentalDate: new Date (rentalDate)
     })

    return res.status(201).json({message:"rental created", availableCarForRental})


}

//================================================================UPDATE RENTAL===========================================================
export const updateRental = async (req, res, next) => {
    const { id } = req.params;
    const {returnDate } = req.body
    
    const rental = await db.collection("rentals").updateOne({ _id: new ObjectId(id) }, { $set: {returnDate : new Date(returnDate)} });
    const updatedRental = await db.collection("rentals").findOne({ _id: new ObjectId(id) }) 
    return rental.matchedCount? res.status(200).json({ message: 'rental updated successfully', updatedRental}) : res.status(404).json({message: "rental not found"})
    
}

//================================================================DELETE RENTAL===========================================================
export const deleteRental = async (req, res, next) => {
    const { id } = req.params;
    const deletedRental = await db.collection("rentals").deleteOne({ _id: new ObjectId(id) });
  return deletedRental.deletedCount?  res.status(200).json({ message: 'car deleted successfully'}): res.status(404).json({message: "rental not found"})
}



//==============================================================GET SPECIFIC RENTAL====================================================================
export const getRental = async (req, res, next) => {
    const { id } = req.params
    const rental = await db.collection("rentals").findOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "done", rental })

}


//================================================================GET ALL RENTALS===========================================================

export const getAllRentals = async (req, res, next) => {
    const rentals = await db.collection("rentals").find().toArray()
    res.status(200).json({ message: "done", rentals })

}
