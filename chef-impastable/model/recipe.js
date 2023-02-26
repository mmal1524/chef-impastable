import { modalUnstyledClasses } from "@mui/material";
import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    author:{
        type:String,
        required:true,
        unique:true
    },
    canonical_url:{
        type:String, 
        required:false
    },
    category: {
        type:String,
        required:false
    },
    description: {
        type:String,
        required:true
    },
    host: {
        type:String,
        required:false
    },
    image:{
        type:String,
        required:false
    },
    ingredients: {
        type:Array,
        required:true,
    },
    instructions: {
        type:String,
        required:true
    },
    instructions_list: {
        type:Array,
        required:false
    },
    language: {
        type:String,
        required:false
    },
    nutrients: {
        type:Object,
        required:false
    },
    prep_time: {
        type: Number,
        required:true
    },
    ratings: {
        type:Number,
        required:false
    },
    site_name: {
        type:String,
        required:false
    },
    total_time: {
        type:Number,
        required:false
    },
    yields: {
        type:String,
        required:false
    }
});

module.exports = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

