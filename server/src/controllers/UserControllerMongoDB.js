import UserModel from "../models/User.js";

const getUser = async(req,res) => {
    try{
        const user = await UserModel.find()
        console.log(user)
        console.log(typeof(user))
        res.send(user)
    }catch(error){
        console.log(error)
    }
}

const createUser = async(req,res) => {
    try{

        const {user,pass} = req.body;
        const newUser = new UserModel({
            user,pass
        })
        
        await newUser.save()
        res.status(200).json({success : true , Message : "User Created Successfully" , newUser})
    }catch(error){
        console.log(error)
        res.status(500).json({success : false , Message : "server error " , newUser})
    }
}

const updateUser = async (req,res) => {
    try{
        const userID = req.params.id
        const updatedUser = await UserModel.findByIdAndUpdate(userID,req.body,{new : true});
        res.send([updatedUser]);
        console.log(updateUser)
    }catch(error){
        console.log(error)
    }
}


const deleteUser = async (req,res) => {
    try{
        const userID = req.params.id
        const deletedUser = await UserModel.findByIdAndDelete(userID);
        res.send("User Deleted Successfully ")
    }catch(error){
        console.log(error)
    }
}

export {createUser,getUser,updateUser,deleteUser};