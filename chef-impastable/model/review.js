import { modalUnstyledClasses } from "@mui/material";
import mongoose, { SchemaTypes } from "mongoose";

const reviewSchema = new mongoose.Schema({
    recipeID:SchemaTypes.ObjectId,
    author:{
        type:String,
        required:true
    },
    rating:Number,
    description:String
});

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);