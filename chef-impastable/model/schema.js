import { modalUnstyledClasses } from "@mui/material";
import mongoose, { SchemaType, SchemaTypes } from "mongoose";

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
        default:username
    },
    avatar:{
        type:String
    },
    friends:{
        type: [SchemaTypes.ObjectId]
    },
    friendRequests:{
        type: [SchemaTypes.ObjectId]
    }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);


