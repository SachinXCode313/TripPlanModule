import express from "express";
import {createPlan}  from "../controllers/UserControllerMongoDB.js";
// import {getTripPlan,createTripPlan,updateTripPlan,getEmployee,deletePlan}  from "../controllers/UserControllerSheet.js";


const routers = express.Router();

// routers.get('/get',getTripPlan)

// routers.post('/create',createTripPlan)

routers.post('/create',createPlan)

// routers.put('/update/:id',updateTripPlan)

// routers.get('/getEmployee',getEmployee)

// routers.post('/deletePlan',deletePlan)

// routers.delete('/delete/:id',deleteUser)

export default routers;

