import connect from "../../lib/mongodb"
import User from "../../model/user";
import MealPlan from "../../model/mealPlan";

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function getMealPlans(req,res){
    try {
        const {username} =req.body;

        var mealPlans = await MealPlan.find({user: username});

        if (!mealPlans) {
            res.status(400).json({status: "Not able to find meal plans"});
        }
        else {
            return res.json(mealPlans);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to find mealPlans'});
        console.log('error');
    }
}