import { modalUnstyledClasses } from "@mui/material";
import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    author:{
        type:String,
        required:false,
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
    cook_time: {
        type:String, 
        required:false
    },
    description: {
        type:String,
        required:false
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
        required:false,
    },
    instructions: {
        type:String,
        required:false
    },
    instructions_list: {
        type:[String],
        required:false
    },
    language: {
        type:String,
        required:false
    },
    nutrients: {
        type:Array,
        required:false
    },
    prep_time: {
        type:String,
        required:false
    },
    ratings: {
        type:String,
        required:false
    },
    site_name: {
        type:String,
        required:false
    },
    title: {
        type:String,
        reqiured:false
    },
    total_time: {
        type:String,
        required:false
    },
    yields: {
        type:String,
        required:false
    },
    tags: [
        {
            tag: {
                type:String, 
                required:false
            },
            exists: {
                type:Boolean,
                required:false
            }
        }
    ],
    isUser: {
        type:Boolean,
        required:false
    }
});

module.exports = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema);

