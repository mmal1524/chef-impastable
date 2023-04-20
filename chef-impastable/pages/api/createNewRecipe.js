import connect from "../../lib/mongodb"
import Recipe from "../../model/recipe"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req, res) {
    const { title, image, preptime, cookTime, totalTime, yields, description, ingredients, instructions,
        calories, carbs, cholesterol, fiber, protein, saturatedFat, sodium, fat, unsaturatedFat, username } = req.body;
    try {
        const nutritionFacts = {
            calories: calories, 
            carbohydrateContent: carbs,
            cholesterolContent: cholesterol,
            fiberContent: fiber,
            proteinContent: protein,
            saturatedFatContent: saturatedFat,
            sodiumContent: sodium,
            fatContent: fat,
            unsaturatedFatContent: unsaturatedFat
    };
        const recipe = new Recipe({
            title: title,
            image: image,
            prep_time: preptime,
            cook_time: cookTime,
            total_time: totalTime, 
            yields: yields,
            description: description,
            ingredients: ingredients,
            instructions_list: instructions,
            nutrients: nutritionFacts,
            author: username,
            isUser: true
        })
        recipe.save(function (err, recipe) {
            if (err) {
              console.log(err);
            } else {
              console.log('Recipe saved to database: ', recipe);
            }
          });
        return res.json(recipe);
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}