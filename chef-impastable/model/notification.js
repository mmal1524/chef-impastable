import { modalUnstyledClasses } from "@mui/material";
import mongoose, { SchemaTypes } from "mongoose";

const notificationSchema = new mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
    },
    newNotification: {
        type:Boolean,
        required:true,
    }
});

module.exports = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);