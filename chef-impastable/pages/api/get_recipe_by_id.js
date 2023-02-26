import connect from "../../lib/mongodb"
import Recipe from "../../model/recipe";

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function get_recipe_by_id(req,res){
    try {
        const id=req.body.id
        const recipe = await Recipe.findById(id)
        if (!recipe) {
            return res.json({success: false});
        }
        else {
            return res.json({success: true});
        }
    } catch (error) {
        res.status(400).json({status:'Not able to find recipe'})
        console.log('error');
    }
}
