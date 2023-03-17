import connect from "../../lib/mongodb"
import Recipe from "../../model/recipe"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {recipeID, reviewID}=req.body
        console.log(reviewID);
        console.log(typeof reviewID);

        const recipe = await Recipe.findOneAndUpdate({_id: recipeID}, {$push: { reviews: reviewID}}, {new: true});
        console.log(recipe);
        
        if (!recipe) {
            return null;
        }
        else {
            console.log(recipe)
            return res.json({success: true});
        }
    } catch (error) {
        res.status(400).json({status:'Not able to update recipe.'})
        console.log('error');
    }
}