import { modalUnstyledClasses } from "@mui/material";
import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    ingredient:{
        type:String,
        required:true,
        unique:true
    }
});

module.exports = mongoose.models.Ingredient || mongoose.model('Ingredient', ingredientSchema);

