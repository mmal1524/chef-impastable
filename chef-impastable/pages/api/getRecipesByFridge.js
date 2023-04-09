import connect from "../../lib/mongodb"
import Recipe from "../../model/recipe";

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function getRecipesByFridge(req,res){
    try {
        const username=req.body.user;
        // get the user and their fridge
        // aggregate and get recipes by unwinding the ingredients
        // check if the ingredent is in the user's fridge
        // count how many times the each recipes has a match in the fridge
        // sort by match count
        const user = await User.findOne({username})
        
        var data = await Recipe.aggregate([
            {
                $project: {
                    matches: {
                        $filter: {
                            input: "$ingredients",
                            as: "ingredient",
                            cond: { $in: ["$$item", user.fridge]}
                        }
                    }
                }
            }
        ])
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
    } catch (error) {
        res.status(400).json({status:'Not able to find folders'});
        console.log('error');
    }
}
