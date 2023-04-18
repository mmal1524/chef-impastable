import connect from "../../lib/mongodb"
import User from "../../model/user"
import MealPlan from "../../model/mealPlan"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function deleteMealPlan(req,res){
    try {
        const {username, mealPlan}=req.body;
        console.log(username);
        console.log(mealPlan);
        const ret = await MealPlan.deleteOne({name: mealPlan, user: username});
        console.log(ret);
        const user = await User.findOneAndUpdate({username: username}, {$pull: { mealPlans: mealPlan}}, {new: true});
        console.log(user);
        
        if (user == null) {
            return res.json()
        }
        else {
            return res.json(user);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to update user.'});
        console.log('error');
    }
}