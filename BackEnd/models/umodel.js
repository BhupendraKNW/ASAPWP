import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type: String,
            unique: true,
            required: true,
            minlength: 3,
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:"",
    },
},{timestamps:true})

const User=mongoose.model("User",userSchema);

export default User;