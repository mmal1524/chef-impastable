import { modalUnstyledClasses } from "@mui/material";
import { ObjectId, ObjectID } from "bson";
import mongoose, { SchemaTypes } from "mongoose";
import SavedFolder from "./savedFolder";

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
    fridge_grouped: {
        type: Map,
        of: [String]
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
    mealPlanPrivacy: String,
    dietaryTags: {
        type:[String]
    },
    saved: {
        type:[ObjectId],
    }

});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

