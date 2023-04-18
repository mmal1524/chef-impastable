import connect from "../../lib/mongodb"
import MealPlan from "../../model/mealPlan"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {username, mealPlan, day, recipeID}=req.body

        var data;
        switch(day) {
            case "Sunday":
                data = await MealPlan.findOneAndUpdate({name: mealPlan, user: username}, {$push: { Sunday: recipeID}}, {new: true});
                break;
            case "Monday":
                data = await MealPlan.findOneAndUpdate({name: mealPlan, user: username}, {$push: { Monday: recipeID}}, {new: true});
                break;
            case "Tuesday":
                data = await MealPlan.findOneAndUpdate({name: mealPlan, user: username}, {$push: { Tuesday: recipeID}}, {new: true});
                break;
            case "Wednesday":
                data = await MealPlan.findOneAndUpdate({name: mealPlan, user: username}, {$push: { Wednesday: recipeID}}, {new: true});
                break;
            case "Thursday":
                data = await MealPlan.findOneAndUpdate({name: mealPlan, user: username}, {$push: { Thursday: recipeID}}, {new: true});
                break;
            case "Friday":
                data = await MealPlan.findOneAndUpdate({name: mealPlan, user: username}, {$push: { Friday: recipeID}}, {new: true});
                break;
            case "Saturday":
                data = await MealPlan.findOneAndUpdate({name: mealPlan, user: username}, {$push: { Saturday: recipeID}}, {new: true});
                break;
        }

        if (!data) {
            return null;
        }
        else {
            return res.json(data);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to update user.'})
        console.log('error');
    }
}