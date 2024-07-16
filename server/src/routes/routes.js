import express from "express";
// import {createUser,getUser,updateUser,deleteUser}  from "../controllers/UserControllerMongoDB.js";
import {getTripPlan,createTripPlan,updateTripPlan}  from "../controllers/UserControllerSheet.js";


const routers = express.Router();

routers.get('/get',getTripPlan)

routers.post('/create',createTripPlan)

routers.put('/update/:id',updateTripPlan)

// routers.delete('/delete/:id',deleteUser)

export default routers;