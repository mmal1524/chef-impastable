import connect from "../../lib/mongodb"
import Recipe from "../../model/recipe"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req, res) {
    const { search } = req.body;
    try {
        const recipes = await Recipe.find({title: {$regex: new RegExp(search, 'i')}});
        recipes.forEach((recipe) => {
            console.log(recipe.title); // print the title of each matching recipe
          });
        res.json(recipes);
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}