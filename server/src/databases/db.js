import mongoose from 'mongoose'
//Set up default mongoose connection

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/tripplan");
        console.log("MongoDB Is Connected")
    }catch(error){
        console.log(error);s
    }
}

export default connectDB;