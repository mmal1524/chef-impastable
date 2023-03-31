import connect from "../../lib/mongodb"
import Recipe from "../../model/recipe";

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function getRecipesByAuthor(req,res){
    try {
        const author = req.author
        console.log(author)
        const recipes = await Recipe.find({author: author, isUser: true})
        console.log(recipes)
        if (!recipes) {
            return res.json({success: []});
        }
        else {
            return res.json(recipes);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to find folders'});
        console.log('error');
    }
}
