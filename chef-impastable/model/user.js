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
    shoppingList: [String],
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
    },
    reviewedRecipes: {
        type:[SchemaTypes.ObjectId],
        required:false
    },
    households: {
        type:[ObjectID]
    },
    mealPlans: {
        type:[String]
    },
    currentMealPlan: {
        type: String
    },
    success: {
        type:Boolean,
        required:false
    },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

