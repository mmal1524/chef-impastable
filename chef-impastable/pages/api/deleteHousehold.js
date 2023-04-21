import connect from "../../lib/mongodb"
import Household from "../../model/household"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {householdID}=req.body
        const ret = await Household.deleteOne({_id: householdID});

        if (!ret) {
            return res.json({success : false});
        } else {
            return res.json({success: true});
        }
        
    
    } catch (error) {
        res.status(400).json({status:'Not able to delete household.'});
        console.log('error');
    }
}