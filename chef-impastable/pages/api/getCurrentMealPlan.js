import connect from "../../lib/mongodb"
import User from "../../model/user";
import MealPlan from "../../model/mealPlan";

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function getCurrentMealPlan(req,res){
    try {
        const {username, mealPlan} =req.body;

        var mealPlan = await MealPlan.findOne({user: username, name: mealPlan});

        if (!mealPlan) {
            res.json({success: "fail"});
        }
        else {
            return res.json(mealPlan);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to find mealPlans'});
        console.log('error');
    }
}