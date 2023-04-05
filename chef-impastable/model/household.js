import { modalUnstyledClasses } from "@mui/material";
import { ObjectID } from "bson";
import mongoose from "mongoose";

const householdSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    fridge: {
        type:[String]
    },
    members: {
        type:[ObjectID]
    },
    saved: {
        type:[ObjectID],
    },
});

module.exports = mongoose.models.Household || mongoose.model('Household', householdSchema);

