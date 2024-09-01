import express from 'express'
import db from './DB/connectionDB.js'
import customerRouter from './src/modules/customers/customers.routes.js'
import carsRouter from './src/modules/cars/cars.routes.js'
import rentalRouter from './src/modules/rentals/rentals.routes.js'
import specialRouter from './src/modules/specials/specials.routes.js'
const app = express()
const port = 3000

db


app.use(express.json())

app.use("/" , customerRouter)

app.use("/" , carsRouter)

app.use("/" , rentalRouter)

app.use("/", specialRouter)

app.use('*', (req, res) => res.json({message: '404 not found'}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))