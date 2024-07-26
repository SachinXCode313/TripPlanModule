import { TripPlan,Counter } from "../models/Employees.js";

const getEmployee = async (req, res) => {
    try {
        const employee = await EmployeeModel.find()
        console.log(employee)
        console.log(typeof (employee))
        res.send(employee)
    } catch (error) {
        console.log(error)
    }
}

const getLastData = async () => {
    try {
        const lastRecord = await TripPlan.findOne({}, {}, { sort: { planId: -1, sr: -1 } }).exec();
        if (!lastRecord) {
            return { lastPlanId: 200167, lastSr: 0 }; // Default planId if no data found
        }

        return { lastPlanId: lastRecord.planId, lastSr: lastRecord.sr };
    } catch (error) {
        console.error('Error fetching last planId and sr:', error);
        throw error;
    }
};


// Get Users Data
const getTripPlan = async (req, res) => {
    try {
        const tripPlans = await TripPlan.find().exec();
        res.status(200).send(tripPlans);
    } catch (error) {
        console.error('Error fetching trip plans:', error);
        res.status(500).send('An error occurred while fetching trip plans.');
    }
};

const getNextSequenceValue = async (sequenceName) => {
    const sequence = await Counter.findByIdAndUpdate(
        sequenceName,
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    return sequence.sequence_value;
};


// Create Users Data
const createPlan = async (req, res) => {
    try {
        const trips = req.body; // Assuming req.body is an array of trip objects
        const planId = await getNextSequenceValue('planIdCounter'); // Generate the next planId

        // Validate and save each trip object with the new planId
        for (const trip of trips) {
            const newTrip = new TripPlan({
                ...trip,
                planId: planId.toString(), // Convert to string if needed
            });
            await newTrip.save();
        }

        res.status(200).send('Trips saved successfully with planId: ' + planId);
    } catch (error) {
        console.error('Error saving trips:', error);
        res.status(500).send('Internal Server Error');
    }
};




const updateUser = async (req, res) => {
    try {
        const userID = req.params.id
        const updatedUser = await UserModel.findByIdAndUpdate(userID, req.body, { new: true });
        res.send([updatedUser]);
        console.log(updateUser)
    } catch (error) {
        console.log(error)
    }
}


const deleteUser = async (req, res) => {
    try {
        const userID = req.params.id
        const deletedUser = await UserModel.findByIdAndDelete(userID);
        res.send("User Deleted Successfully ")
    } catch (error) {
        console.log(error)
    }
}

export { getEmployee, createPlan, updateUser, deleteUser };