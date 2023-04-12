import connect from "../../lib/mongodb"
import MealPlan from "../../model/mealPlan"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {username, plan, day, recipeID, index}=req.body

        var mealPlan = await MealPlan.findOne({name: plan, user: username});
        var recipes;
        switch(day) {
            case "Sunday":
                recipes = mealPlan.Sunday;
                break;
            case "Monday":
                recipes = mealPlan.Monday;
                break;
            case "Tuesday":
                recipes = mealPlan.Tuesday;
                break;
            case "Wednesday":
                recipes = mealPlan.Wednesday;
                break;
            case "Thursday":
                recipes = mealPlan.Thursday;
                break;
            case "Friday":
                recipes = mealPlan.Friday;
                break;
            case "Saturday":
                recipes = mealPlan.Saturday;
                break;
        }

        recipes.splice(index, 1);

        var data;
        switch(day) {
            case "Sunday":
                data = await MealPlan.findOneAndUpdate({name: plan, user: username}, {Sunday: recipes}, {new: true});
                break;
            case "Monday":
                data = await MealPlan.findOneAndUpdate({name: plan, user: username}, {Monday: recipes}, {new: true});
                break;
            case "Tuesday":
                data = await MealPlan.findOneAndUpdate({name: plan, user: username}, {Tuesday: recipes}, {new: true});
                break;
            case "Wednesday":
                data = await MealPlan.findOneAndUpdate({name: plan, user: username}, {Wednesday: recipes}, {new: true});
                break;
            case "Thursday":
                data = await MealPlan.findOneAndUpdate({name: plan, user: username}, {Thursday: recipes}, {new: true});
                break;
            case "Friday":
                data = await MealPlan.findOneAndUpdate({name: plan, user: username}, {Friday: recipes}, {new: true});
                break;
            case "Saturday":
                data = await MealPlan.findOneAndUpdate({name: plan, user: username}, {Saturday: recipes}, {new: true});
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