import connect from "../../lib/mongodb"
import Ingredient from '../../model/ingredient'
import Household from "../../model/household"


let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    const {ingredient, group, id, addButton} = req.body

    try {
        const ingredientRet = await Ingredient.findOne({ingredient: ingredient})
        const house = await Household.findOne({_id: id})
        console.log(house);
        //if the ingredient already exists, or if the ingredient doesn't exist but the house didn't
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
            console.log("creating")
            Ingredient.create({ingredient: ingredient})
        }
        console.log("here 2.5")
        // Check if group is already in the household's fridge groups
        if (!house.fridge_grouped.get(group)) {
            console.log("check if in group already")
            house.fridge_grouped.set(group, [ingredient])
        }
        else {
            console.log("else")
            var fridge_group = house.fridge_grouped.get(group)
            fridge_group.push(ingredient)
            house.fridge_grouped.set(group, fridge_group)
        }
        console.log("here pt 3")
        house.fridge.push(ingredient)
        house.save()
        house.success = true;
        return res.json(house);
        
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}