import { modalUnstyledClasses } from "@mui/material";
import { ObjectID } from "bson";
import mongoose, { SchemaTypes } from "mongoose";

const householdSchema = new mongoose.Schema({
    householdId:SchemaTypes.ObjectId,
    name:{
        type:String,
    },
    fridge: {
        type:[String]
    },
    fridge_grouped: {
        type: Map,
        of: [String]
    },
    members: {
        type:[String],
    },
    saved: {
        type:[ObjectID],
    },
    success: {
        type:Boolean,
        required:false
    }
});

module.exports = mongoose.models.Household || mongoose.model('Household', householdSchema);

