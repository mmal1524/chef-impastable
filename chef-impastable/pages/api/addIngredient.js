import connect from "../../lib/mongodb"
import Ingredient from '../../model/ingredient'

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req, res){
    try {
        const ingredient = req.body.ingredient
        const addButton = req.body.addButton
        const ingredientRet = await Ingredient.findOne({ingredient})
        console.log("add button: " + addButton + " and ingredient: " + ingredientRet)

        if (addButton && ingredientRet) {
            //ingredient should not be added to database
            return res.json({success: false});
        } else if (!addButton && !ingredientRet) {
            return res.json({success: false});
        }
        if(!ingredientRet){
            // ingredient needs to be added to the database
            await Ingredient.create({ingredient: ingredient})
        }
        return res.json({success: true});
    } catch (error) {
        res.status(400).json({status:'Not able to add ingredient.'})
    }
}