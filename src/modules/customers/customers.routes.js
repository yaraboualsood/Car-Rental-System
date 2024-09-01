import { Router } from "express";
import * as UC from "./customers.controller.js"

const router = Router() 

//signup
router.post("/signup", UC.signUp)

//login
router.post("/login", UC.login)

//get specific customer
router.get("/customers/:id", UC.getCustomer)

//get all customers
router.get("/customers", UC.getAllCustomers)

//update customer (owner only)
router.put("/customers/:id", UC.updateCustomer)

//delete customer (owner only)
router.delete("/customers/:id", UC.deleteCustomer)


export default router