import { ObjectId } from "mongodb";
import connect from "../../lib/mongodb"
import Household from "../../model/household"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {householdID, username}=req.body
        const household = await Household.findOneAndUpdate({_id: householdID}, {$push: { members: username}}, {new: true});

        if (!household) {
            return null;
        }
        else {
            return res.json({success: true});
        }
    } catch (error) {
        res.status(400).json({status:'Not able to update user.'})
        console.log('error');
    }
}