import connect from "../../lib/mongodb"
import Recipe from "../../model/recipe"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req, res) {
  const { search, filters = [] } = req.body;
  const filtersArray = Array.isArray(filters) ? filters : [filters];
  try {
    const recipes = await Recipe.find({ title: { $regex: new RegExp(search, 'i') } });
    //if the search was sent with dietary filters
    if (filtersArray.length > 0) {
      const filteredRecipes = recipes.filter((recipe) => {
        let result = true;
        filtersArray.every((filter) => {
          // Check if the recipe contains any of the selected tags
          const tag = recipe.tags.find((t) => t.tag === filter);
          result = result && tag && tag.exists;
          return result;
        });
        return result;
      });
      return res.json(filteredRecipes);
    }
    return res.json(recipes);
  } catch (error) {
    res.status(400).json()
    console.log(error);
  }
}