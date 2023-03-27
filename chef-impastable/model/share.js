import { modalUnstyledClasses } from "@mui/material";
import mongoose, { SchemaTypes } from "mongoose";

const shareSchema = new mongoose.Schema({
    recipeID:SchemaTypes.ObjectId,
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    }
});

module.exports = mongoose.models.Share || mongoose.model('Share', shareSchema);