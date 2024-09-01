import { ObjectId } from "mongodb";
import db from "../../../DB/connectionDB.js"

//==========================================================ADD CAR========================================================================
export const addCar = async (req, res, next) => {
    const { name, model } = req.body

    const newCar= { name, model, rentalStatus: "available" }

    await db.collection('cars').insertOne(newCar)
    return res.status(201).json({ message: 'car added successfully', newCar });

}

//==============================================================GET SPECIFIC CAR====================================================================
export const getCar = async (req, res, next) => {
    const { id } = req.params
    const car = await db.collection("cars").findOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "done", car })

}


//================================================================GET ALL CARS===========================================================

export const getAllCars = async (req, res, next) => {
    const cars = await db.collection("cars").find().toArray()
    res.status(200).json({ message: "done", cars })

}

//================================================================UPDATE CAR===========================================================
export const updateCar = async (req, res, next) => {
    const { id } = req.params;
    const { name, model, rentalStatus } = req.body
    const updatedCar = { name, model, rentalStatus}

    const {matchedCount} = await db.collection("cars").updateOne({ _id: new ObjectId(id) }, { $set: updatedCar });

    return matchedCount? res.status(200).json({ message: 'car updated successfully'}) : res.status(404).json({message: "car not found"})
   
    // if (!car.matchedCount){
    //  return res.status(404).json({message: "car not found"})
    // }
    //  return res.status(200).json({ message: 'car updated successfully', car });
}

//================================================================DELETE CAR===========================================================
export const deleteCar = async (req, res, next) => {
    const { id } = req.params;
    const {deletedCount} = await db.collection("cars").deleteOne({ _id: new ObjectId(id) });

    return deletedCount ? res.status(200).json({ message: 'car deleted successfully' }) : res.status(404).json({message: "car not found"})
   

//     const allCars = await db.collection("cars").find().toArray()
//     res.status(200).json({ message: 'car deleted successfully', car, allCars });
}