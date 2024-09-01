import { MongoClient } from "mongodb";

const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect().then(()=>{
    console.log("successfully connected to mongoDB")
}).catch((err)=>{
    console.log("Error connecting to mongodb",err)
})

const db = client.db("Assignment7")

export default db