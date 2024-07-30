import dotenv from 'dotenv';
import express, { Router } from 'express'
import connectDB from './src/databases/db.js'
import routers from './src/routes/routes.js';
import cors from 'cors'
const app = express()
dotenv.config()

const port = process.env.PORT;
const corsConfig = {
    origin: "http://localhost:3000/", // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}
connectDB();
app.use(express.json())
app.options("",cors(corsConfig))
app.use(cors(corsConfig));

app.use('/test', (req, res) => {
    res.send("Hello Server IS working 5:)")
})
app.use('/api', routers)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})







