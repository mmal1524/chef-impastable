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
        console.log(getRecipeData);
        var folders = await SavedFolder.find({user: username});
        // console.log(folders);
        console.log(typeof(folders));
        if (!folders) {
            res.status(400).json({status: "Not able to find folders"});
        }
        else {
            if (getRecipeData) {
                var dupFolders = [];
                // console.log("in if")
                for (var i = 0; i < folders.length; i++) {
                    var tempFolder = Object();
                    tempFolder.name = folders[i].name;
                    var recipes = folders[i].recipes;
                    var recipesData = []
                    for (var j = 0; j < recipes.length; j++) {
                        var data = await Recipe.findById(recipes[j]);
                        // console.log(data);
                        recipesData.push(data);
                    }
                    Object(folders);
                    tempFolder.recipes = recipesData;
                    dupFolders.push(tempFolder);
                    // console.log(dupFolders);
                    // folders[i].recipes = recipesData;
                    // console.log(folders);
                }
                return res.json(dupFolders);
            }
            // console.log(folders);
            return res.json(folders);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to find folders'});
        console.log('error');
    }
}
