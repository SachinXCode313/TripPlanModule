import dotenv from 'dotenv';
import express, { Router } from 'express'
import connectDB from './src/databases/db.js'
import routers from './src/routes/routes.js';
import cors from 'cors'
const app = express()
dotenv.config()

const port = process.env.PORT;

connectDB();
app.use(express.json())
app.use(cors({
    origin: '*', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use('/test', (req, res) => {
    res.send("Hello Server IS working :)")
})
app.use('/api', routers)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})







