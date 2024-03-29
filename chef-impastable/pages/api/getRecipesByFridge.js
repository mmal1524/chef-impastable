import connect from "../../lib/mongodb"
import Recipe from "../../model/recipe";
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function getRecipesByFridge(req,res){
    try {
        const username=req.body.username;
        const page = req.body.page;
        // get the user and their fridge
        // aggregate and get recipes by unwinding the ingredients
        // check if the ingredent is in the user's fridge
        // count how many times the each recipes has a match in the fridge
        // sort by match count
        const user = await User.findOne({username})
        console.log(user.fridge);
        var recipes = await Recipe.aggregate(
            [
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
        var hasNext = false;
        if (recipes.length >= (page*20)) {
            hasNext = true;
        }

        recipes = recipes.slice((page-1)*20, page*20);
        /*
        var data = await Recipe.find({
            $expr: {$function: {
                body: function() {
                    console.log(username);
                    return true;
                },
                args: [],
                lang: "js"
            }}
        });
              */   
        return res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({status:'Not able to find matches'});
        console.log('error with ingredient matching');
    }
}
