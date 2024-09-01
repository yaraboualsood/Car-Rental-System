import { ObjectId } from "mongodb";
import db from "../../../DB/connectionDB.js"
import bcrypt from "bcrypt"




//=============================================================SIGNUP========================================================================
export const signUp = async (req, res, next) => {
    const { name, password, email, phoneNumber } = req.body

    // Check if the customer already exists
    const existingCustomer = await db.collection('customers').findOne({ email });
    if (existingCustomer) {
        return res.status(400).json({ message: 'Customer with this email already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newCustomer = { name, password: hashedPassword, email, phoneNumber }

    await db.collection('customers').insertOne(newCustomer)
    return res.status(201).json({ message: 'User registered successfully', newCustomer });

}

//==================================================================LOGIN====================================================================
export const login = async (req, res, next) => {
    const { email, password } = req.body
    //check if user exists
    const user = await db.collection('customers').findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "invalid email or password, user doesnt exist" })
    }

    //verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(400).json({ message: "invalid email or password, user doesnt exist" })
    }
    return res.status(200).json({ message: "login successful!" })
}


//==================================================================GET SPECIFIC CUSTOMER=======================================================
export const getCustomer = async (req, res, next) => {
    const { id } = req.params
    const customer = await db.collection("customers").findOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "done", customer })

}


//================================================================GET ALL CUSTOMERS===========================================================

export const getAllCustomers = async (req, res, next) => {
    const customers = await db.collection("customers").find().toArray()
    res.status(200).json({ message: "done", customers })

}

//================================================================UPDATE CUSTOMER===========================================================
export const updateCustomer = async (req, res, next) => {
    const { id } = req.params;
    const { name, password, email, phoneNumber, userId } = req.body

    if (userId != id){
        return res.json({message: "you are not the owner"})
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const updatedCustomer = { name, password: hashedPassword, email, phoneNumber }

    const customer = await db.collection("customers").updateOne({ _id: new ObjectId(id) }, { $set: updatedCustomer });
    
    if (!customer.matchedCount){
       return res.status(404).json({message: "customer not found"})
    }
    // const allCustomers = await db.collection("customers").find().toArray()
   return res.status(200).json({ message: 'Customer updated successfully', customer });
}

//================================================================DELETE CUSTOMER===========================================================
export const deleteCustomer = async (req, res, next) => {
    const { id } = req.params;
    const {userId} =req.body

    if (userId != id){
        return res.json({message: "you are not the owner"})
    }
    const customer = await db.collection("customers").deleteOne({ _id: new ObjectId(id) });
    // const allCustomers = await db.collection("customers").find().toArray()
   
    if(!customer.deletedCount){
      return  res.status(404).json({message: "customer not found"})
    }
    return res.status(200).json({ message: 'Customer deleted successfully', customer });
}
