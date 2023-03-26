import connect from "../../lib/mongodb"
import User from "../../model/user"
let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    const{username, ingredient, group}=req.body;
    try {
        const user = await User.findOne({username: username})
        var arr = user.fridge_grouped.get(group)
        var i = arr.indexOf(ingredient)
        var fridge_group = []
        if (i != arr.length - 1) {
            fridge_group = arr.slice(0, i).concat(arr.slice(i+1))
        }
        else {
            fridge_group = arr.slice(0, i)
        }
        var fridge = user.fridge
        i = fridge.indexOf(ingredient)
        var updated_fridge = []
        if (i != fridge.length - 1) {
            updated_fridge = fridge.slice(0, i).concat(fridge.slice(i+1))
        }
        else {
            updated_fridge = fridge.slice(0, i)
        }

        user.fridge_grouped.set(group, fridge_group)

        user.fridge = updated_fridge
        user.save()

        return res.json(user)
        
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}