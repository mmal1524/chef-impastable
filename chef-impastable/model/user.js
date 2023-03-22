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
<<<<<<< HEAD
    saved: {
        type:[ObjectId],
=======
    reviewedRecipes: {
        type:[SchemaTypes.ObjectId],
        required:false
>>>>>>> 8f0a1cb6462aadc597a8baea0a17291144f6952e
    }

});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

