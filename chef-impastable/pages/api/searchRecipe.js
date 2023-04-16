import connect from "../../lib/mongodb"
import Recipe from "../../model/recipe"
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req, res) {
    const { search, filters = [] , username, byFridge, page } = req.body;
    console.log(search);
    console.log(filters);
    console.log(byFridge);
    console.log(page);
    const filtersArray = Array.isArray(filters) ? filters : [filters];
    console.log(filtersArray);
    const user = await User.findOne({username})
    console.log(user);
    console.log(new RegExp(search, 'i'))
    try {
        //const recipes = await Recipe.find({title: {$regex: new RegExp(search, 'i')}}).skip((page-1)*20).limit(20);
        // console.log("aggregate")
        var recipes;
        if (byFridge) {
            recipes = await Recipe.aggregate(
                [
                    {
                        $match: {
                            title: {$regex: new RegExp(search, 'i')}
                        }
                    },
                    {
                        $addFields: {
                            matches: { 
                                $size: {
                                    $filter: {
                                        input: "$ingredients",
                                        as: "ingredient",
                                        cond: { $in: ["$$ingredient.ingredient", user.fridge]}
                                    }
                                }
                            }
                        }            
                    },
                    {
                        $sort: {matches: -1}
                    }
            ])
            // .skip((page-1)*20)
            // .limit(20);
        }
        else {
            console.log("no fridge");
            recipes = await Recipe.find({title: {$regex: new RegExp(search, 'i')}})
            // .skip((page-1)*20).limit(20)
        }
        console.log("length: " + recipes.length);
        // var filteredRecipes;
        if (filtersArray.length > 0) {
            recipes = recipes.filter((recipe) => {
              let result = true;
              filtersArray.every((filter) => {
                // Check if the recipe contains any of the selected tags
                const tag = recipe.tags.find((t) => t.tag === filter);
                result = result && tag && tag.exists;
                return result;
              });
              return result;
            });
            // console.log(recipes);
            // return res.json(filteredRecipes);
        }

        var hasNext = false;
        if (recipes.length >= (page*20)) {
            hasNext = true;
        }

        recipes = recipes.slice((page-1)*20, page*20);
        console.log(recipes);
        // recipes.forEach((recipe) => {console.log(recipe)});
        // recipes.forEach((recipe) => {
        //     console.log(recipe.title); // print the title of each matching recipe
        //   });
        res.json([recipes, hasNext]);
    } catch (error) {
        res.status(400).json([[], false])
        console.log('error');
    }
    // return res.json(recipes);
}