import connect from "../../lib/mongodb"
import Ingredient from '../../model/ingredient'
import User from "../../model/user"


let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    const user = await User.findOne({username: req.body.username})

    try {
        const ingredient=req.body.ingredient
        const group = req.body.group
        const addButton = req.body.addButton
        const ingredientRet = await Ingredient.findOne({ingredient})
        const user = await User.findOne({username: req.body.username})
        //if the ingredient already exists, or if the ingredient doesn't exist but the user didn't
        //request to add it to the database, return success false
        console.log("add button: " + addButton + " ingredientRet: " + ingredientRet + " and test " + !ingredientRet)
        if ((addButton && ingredientRet)) {
            console.log("here: " + !ingredientRet)
            //ingredient should not be added to database
            return res.json({success: false});
        } else if ( (!addButton && !ingredientRet)) {
            console.log("here part 2") 
            return res.json({success: false});
        }
        if(!ingredientRet){
            // ingredient needs to be added to the database
            Ingredient.create({ingredient: ingredient})
        }
        // Check if group is already in the users fridge groups
        if (!user.fridge_grouped.get(group)) {
            user.fridge_grouped.set(group, [ingredient])
        }
        else {
            var fridge_group = user.fridge_grouped.get(group)
            
            fridge_group.push(ingredient)
            user.fridge_grouped.set(group, fridge_group)
        }
        user.fridge.push(ingredient)
        user.save()

        return res.json(user);
        
    } catch (error) {
        res.status(400).json(user)
    }
}