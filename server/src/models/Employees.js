import mongoose from "mongoose";

const tripPlanSchema = new mongoose.Schema({
    planId: Number,
    sr: String,
    date: String,
    day: String,
    country: String,
    state: String,
    city: String,
    clientName: String,
    purpose: String,
    remarks: String,
});

const counterSchema = new mongoose.Schema({
    _id: String,
    sequence_value: Number
});



// Ensure this is run once to create the index
// tripPlanSchema.index({ PlanId: 1, Sr: 1 }, { unique: true });


const Counter = mongoose.model('Counter', counterSchema);
const TripPlan = mongoose.model('TripPlan', tripPlanSchema);

export { TripPlan ,Counter};