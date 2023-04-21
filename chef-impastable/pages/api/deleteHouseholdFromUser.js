import { ObjectId } from "mongodb";
import connect from "../../lib/mongodb"
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {username, householdID}=req.body
        const user = await User.findOneAndUpdate({username: username}, {$pull: { households: householdID}}, {new: true});

        if (!user) {
            return null;
        }
        else {
            return res.json(user);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to update user.'})
        console.log('error');
    }
}