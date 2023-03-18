import connect from "../../lib/mongodb"
import User from "../../model/user"
import SavedFolder from "../../model/savedFolder"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        // get the users saved folders
        // find the folder with the given recipeid
        // remove the recipe
        const {username, recipeID}=req.body;
        // const user = await User.findOne({username: username});
        console.log(username, recipeID);
        const folder = await SavedFolder.findOne({user: username, recipes: recipeID});
        console.log(folder);
        folder.recipes.pull(recipeID);
        console.log(folder);
        folder.save();
        // if (sf) {
        //     sf.recipes.push(recipeID);
        //     sf.save();
        // }
        // else {
        //     //console.log("new folder");
        //     //console.log(user._id);
        //     console.log(user);
        //     const newFolder = await SavedFolder.create({name: folder, recipes: [recipeID], user: user.username});
        //     console.log(newFolder);
        //     //console.log(recipeID);
        //     //newFolder.recipes.push(recipeID);
        //     user.saved.push(newFolder._id);
        //     user.save();
        // }
        if (folder) {
        return res.json(folder);
        }
        res.status(400).json({status: "error"});
    } catch (error) {
        res.status(400).json({status:'Not able to update user.'})
        console.log('error');
    }
}