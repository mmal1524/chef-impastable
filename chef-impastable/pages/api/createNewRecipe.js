import connect from "../../lib/mongodb"
import Recipe from "../../model/recipe"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req, res) {
    const { title, image, preptime, cookTime, totalTime, yields, description, instructions,
        calories, carbs, cholesterol, fiber, protein, saturatedFat, sodium, fat, unsaturatedFat } = req.body;
    try {
        const nutritionFacts = [
            {calories: calories}, 
            {carbohydrateContent: carbs},
            {cholesterolContent: cholesterol},
            {fiberContent: fiber},
            {proteinContent: protein},
            {saturatedFatContent: saturatedFat},
            {sodiumContent: sodium},
            {fatContent: fat},
            {unsaturatedFat: unsaturatedFat}
        ];
        /*const recipe = await Recipe.create(null, null, null, cookTime, description, null, image, null, null, instructions, 
                                           "en", nutritionFacts, preptime, null, null, title, totalTime, yields, null);*/
        const recipe = new Recipe({
            title: title,
            image: image,
            prep_time: preptime,
            cook_time: cookTime,
            total_time: totalTime, 
            yields: yields,
            description: description,
            instruction_list: instructionList,
            nutrients: nutritionFacts
        })
        recipe.save(function (err, recipe) {
            if (err) {
              console.log(err);
            } else {
              console.log('Recipe saved to database: ', recipe);
            }
          });
        return res.json({
            success: true
        });
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}