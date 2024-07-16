import express, { Router } from 'express'
import connectDB from './src/databases/db.js'
import dotenv from 'dotenv';
import routers from './src/routes/routes.js';
import cors from 'cors'
const app = express()
dotenv.config()

// connectDB();
app.use(express.json())
app.use(cors())
app.use('/api',routers)

app.listen(3000, ()=> {
    console.log("Server is running on 3000 port")
}) 







