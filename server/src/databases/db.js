
import mongoose from 'mongoose'
//Set up default mongoose connection

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB Is Connected")
    }catch(error){
        console.log(error);
    }
}

export default connectDB;