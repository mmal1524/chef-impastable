import { modalUnstyledClasses } from "@mui/material";
import { ObjectID } from "bson";
import mongoose, { SchemaTypes } from "mongoose";

const savedFolderSchema = new mongoose.Schema({
    name: {
        type: String
    },
    recipes: {
        type: [ObjectID]
    },
    user: {
        type: String
    }
})

module.exports = mongoose.models.SavedFolder || mongoose.model('SavedFolder', savedFolderSchema);

