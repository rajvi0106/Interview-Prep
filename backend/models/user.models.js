import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    streak:{
        type: Number,
        default:0,
    },
    lastPracticed:{
        type: Date, 
        default:null,
    }
},{timestamps:true});

const User =mongoose.model("User",UserSchema);
export default User;