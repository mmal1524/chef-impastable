import connect from "../../lib/mongodb"
import User from "../../model/user";

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function getCurrentMealPlan(req,res){
    try {
        const {username, mealPlan} =req.body;

        var user = await User.findOneAndUpdate({username: username}, {currentMealPlan: mealPlan}, {new: true});

        if (!user) {
            res.status(400).json({status: "Not able to update user"});
        }
        else {
            return res.json(user);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to update user'});
        console.log('error');
    }
}