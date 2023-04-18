import connect from "../../lib/mongodb"
import Household from "../../model/household";

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function getHousehold(req,res){
    try {
        const id = req.body._id
        const household = await Household.findById(id)
        if (!household) {
            return res.json({success: false});
        }
        else {
            return res.json(household);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to find households'});
        console.log('error');
    }
}