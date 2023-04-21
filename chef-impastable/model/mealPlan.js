import { modalUnstyledClasses } from "@mui/material";
import mongoose, { SchemaTypes } from "mongoose";

const mealPlanSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    user: {
        type: String,
    },
    Sunday: {
        type: [SchemaTypes.ObjectId],
    },
    Monday: {
        type: [SchemaTypes.ObjectId],
    },
    Tuesday: {
        type: [SchemaTypes.ObjectId],
    },
    Wednesday: {
        type: [SchemaTypes.ObjectId],
    },
    Thursday: {
        type: [SchemaTypes.ObjectId],
    },
    Friday: {
        type: [SchemaTypes.ObjectId],
    },
    Saturday: {
        type: [SchemaTypes.ObjectId],
    },
});

module.exports = mongoose.models.MealPlan || mongoose.model('MealPlan', mealPlanSchema);