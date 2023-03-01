import { modalUnstyledClasses } from "@mui/material";
import mongoose, { SchemaTypes } from "mongoose";

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
    displayName:{
        type:String,
        required:true
    },
    fridge: {
        type:[String]
    },
    kitchen: {
        type:[String]
    }, 
    avatar:{
        type:String
    },
    friends: [String],
    friendRequests: [String],
    createdPrivacy: String,
    savedPrivacy: String,
    reviewedPrivacy: String,
    dietaryTags: {
        type:[String]
    }

});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
