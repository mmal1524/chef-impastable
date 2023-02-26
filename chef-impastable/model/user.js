import { modalUnstyledClasses } from "@mui/material";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String, 
        required:true
    },
    displayName: {
        type:String,
        //required:true
    },
    kitchen: {
        type:[String]
    }

});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

