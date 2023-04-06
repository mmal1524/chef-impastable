import connect from "../../lib/mongodb"
import Household from "../../model/household"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const house = await Household.create(req.body);
        if (!house) {
            return null;
        }
        else {
            return res.json({
                householdID: house._id
            });
        }
    } catch (error) {
        res.status(400).json({status:'Not able to create new household.'})
        console.log('error');
    }
}