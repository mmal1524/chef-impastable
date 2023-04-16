import connect from "../../lib/mongodb"
import Recipe from "../../model/recipe";

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function getRecipe(req,res){
    try {
        const {id} = req.body;
        const recipe = await Recipe.findOne({_id: id})
        if (!recipe) {
            return null;
        }
        else {
            return res.json(recipe);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to find recipe'})
        console.log('error');
    }
}