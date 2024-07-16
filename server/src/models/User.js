import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    user : String,
    pass : String
},{timestamps:true})

const UserModel = mongoose.model('userdata' , userSchema);


export default UserModel;