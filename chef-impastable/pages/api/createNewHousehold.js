import connect from "../../lib/mongodb"
import Household from "../../model/household"
import SavedFolder from "../../model/savedFolder"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const house = await Household.create(req.body);
        const folder = await SavedFolder.create({name: "none", recipes: [], household: house._id})
        if (!house) {
            return null;
        }
        else {
            house.saved.push(folder._id);
            house.save();
            return res.json({
                householdID: house._id
            });
        }
    } catch (error) {
        res.status(400).json({status:'Not able to create new household.'})
        console.log('error');
    }
}