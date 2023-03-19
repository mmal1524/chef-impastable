import connect from "../../lib/mongodb"
import SavedFolder from "../../model/savedFolder";
import Recipe from "../../model/recipe";

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function getSavedFolders(req,res){
    try {
        const username=req.body.user;
        const getRecipeData = req.body.getData;
        const folders = await SavedFolder.find({user: username});
        console.log(folders);
        if (!folders) {
            res.status(400).json({status: "Not able to find folders"});
        }
        else {
            if (getRecipeData) {
                folders.forEach( (folder) => {
                    folder.recipes = folder.recipes.map( async (recipeID) => {
                        await Recipe.findById(recipeID);
                    });
                    console.log(folder.recipes);
                });
                console.log(folders);
            }
            return res.json(folders);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to find folders'});
        console.log('error');
    }
}
