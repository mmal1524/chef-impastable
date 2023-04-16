import connect from "../../lib/mongodb"
import MealPlan from "../../model/mealPlan"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const mealPlan = await MealPlan.create(req.body);
        if (!mealPlan) {
            return null;
        }
        else {
            return res.json({
                name: mealPlan.name
            });
        }
    } catch (error) {
        res.status(400).json({status:'Not able to create new review.'})
        console.log('error');
    }
}