import connect from "../../lib/mongodb"
import Household from "../../model/household"
let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    const{id, ingredient, group}=req.body;
    try {
        const house = await Household.findOne({_id: id})
        var arr = house.fridge_grouped.get(group)
        var i = arr.indexOf(ingredient)
        var fridge_group = []
        if (i != arr.length - 1) {
            fridge_group = arr.slice(0, i).concat(arr.slice(i+1))
        }
        else {
            fridge_group = arr.slice(0, i)
        }
        var fridge = house.fridge
        i = fridge.indexOf(ingredient)
        var updated_fridge = []
        if (i != fridge.length - 1) {
            updated_fridge = fridge.slice(0, i).concat(fridge.slice(i+1))
        }
        else {
            updated_fridge = fridge.slice(0, i)
        }

        house.fridge_grouped.set(group, fridge_group)

        house.fridge = updated_fridge
        house.save()

        return res.json(house)
        
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}