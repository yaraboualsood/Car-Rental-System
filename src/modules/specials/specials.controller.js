import { ObjectId } from "mongodb";
import db from "../../../DB/connectionDB.js"


//=======================================================Get all cars whose model is ‘Honda’ and ‘Toyota’========================================================================
export const specialHondaTayota = async (req, res, next) => {
    const cars = await db.collection("cars").find({
        model: { $in: ["honda", "tayota", "Tayota", "Honda"] }
    }).toArray()

    if (!cars.length) {
        return res.status(404).json({ message: "car not found" })
    }
    return res.status(200).json({ message: "found successfully", cars })


}

//=======================================================Get Available Cars of a Specific Model========================================================================
export const availableCarsSpecificModel = async (req, res, next) => {
    const cars = await db.collection("cars").find({ model: req.query.model, rentalStatus: "available" }).toArray()

    if (!cars.length) {
        return res.status(404).json({ message: "car not found" })
    }
    return res.status(200).json({ message: "found successfully", cars })
}

//=======================================================Get Cars that are Either rented or of a Specific Model========================================================================
export const RentedOrSpecificModel = async (req, res, next) => {
    const { model } = req.query

    let cars
    if (model) {
        cars = await db.collection("cars").find({ model: req.query.model }).toArray()
    }
    else {
        cars = await db.collection("cars").find({ rentalStatus: "rented" }).toArray()
    }

    if (!cars.length) {
        return res.status(404).json({ message: "car not found" })
    }
    return res.status(200).json({ message: "found successfully", cars })
}

//=============================================================Get Available Cars of Specific Models or Rented Cars of a Specific Model========================================================================
export const SpecificModelRentedOrAvailable = async (req, res, next) => {
    const { model } = req.query


    const cars = await db.collection("cars")
        .find({
            $or: [
                { rentalStatus: "available", model },
                { rentalStatus: "rented", model }
            ]
        }).toArray()



    if (!cars.length) {
        return res.status(404).json({ message: "car not found" })
    }
    return res.status(200).json({ message: "found successfully", cars })
}


