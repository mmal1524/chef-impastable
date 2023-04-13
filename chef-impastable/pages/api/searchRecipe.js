import connect from "../../lib/mongodb"
import Recipe from "../../model/recipe"
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req, res) {
    const { search, username, byFridge, page } = req.body;
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
            .skip((page-1)*20)
            .limit(20);
        }
        else {
            recipes = await Recipe.find({title: {$regex: new RegExp(search, 'i')}}).skip((page-1)*20).limit(20)
        }
        recipes.forEach((recipe) => {
            console.log(recipe.title); // print the title of each matching recipe
          });
        res.json(recipes);
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}