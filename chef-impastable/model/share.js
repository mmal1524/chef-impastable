import { modalUnstyledClasses } from "@mui/material";
import mongoose, { SchemaTypes } from "mongoose";

const shareSchema = new mongoose.Schema({
    recipeID:SchemaTypes.ObjectId,
    sender:{
        type:String,
        required:true
    },
<<<<<<< HEAD
    receiver:{
=======
    reciever:{
>>>>>>> 59c4c8f0de6a7fb64e639f2826b90f17a676f253
        type:String,
        required:true
    }
});

module.exports = mongoose.models.Share || mongoose.model('Share', shareSchema);