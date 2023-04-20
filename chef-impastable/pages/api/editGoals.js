import connect from "../../lib/mongodb"
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    const{username, goals}=req.body;
    try {
        const user = await User.findOneAndUpdate({username: username}, {goals: {caloriesLower: goals[0], caloriesUpper: goals[1], carbsLower: goals[2], carbsUpper: goals[3], cholesterolLower: goals[4], cholesterolUpper: goals[5], fiberLower: goals[6], fiberUpper: goals[7], proteinLower: goals[8], proteinUpper: goals[9], saturatedFatLower: goals[10], saturatedFatUpper: goals[11], sodiumLower: goals[12], sodiumUpper: goals[13], fatLower: goals[14], fatUpper: goals[15], unsaturatedFatLower: goals[16], unsaturatedFatUpper: goals[17], comments: goals[18]}});
        console.log(user)
        return res.json(user);
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}