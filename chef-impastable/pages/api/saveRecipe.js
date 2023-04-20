import connect from "../../lib/mongodb"
import User from "../../model/user"
import SavedFolder from "../../model/savedFolder"
import Household from "../../model/household"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        // get the user and the existing folders
        // check if the folder that is sent is already a folder the user has
        // if already a folder, add the recipe to it
        // if not a folder, create a folder with the given title
        // add the recipe to the new folder
        // add the new folder to the user
        const {id, folder, recipeID, isHouse}=req.body
        console.log(recipeID);
        var user;
        var sf;
        if (!isHouse) {
            user = await User.findOne({username: id});
            sf = await SavedFolder.findOne({user: id, name: folder});
        }
        else {
            // user = await Household.findById(id)
            // console.log(id);
            var [houseName, members] = id.split(": ");
            members = members.split(",")
            // console.log(houseName);
            // console.log(members)
            user = await Household.findOne({name: houseName, members: members});
            console.log(user)
            sf = await SavedFolder.findOne({household: user._id, name: "none"});
            console.log("sf doesn't break?")
        }
        // console.log(user);
        console.log(sf);
        if (sf) {
            console.log(recipeID);
            sf.recipes.push(recipeID);
            sf.save();
        }
        else {
            console.log("OH NO")
            //console.log("new folder");
            //console.log(user._id);
            // console.log(user);
            const newFolder = await SavedFolder.create({name: folder, recipes: [recipeID], user: user.username});
            // console.log(newFolder);
            //console.log(recipeID);
            //newFolder.recipes.push(recipeID);
            user.saved.push(newFolder._id);
            user.save();
        }
        if (!user) {
            return null;
        }
        else {
            // console.log(user);
            return res.json(user);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to update user.'})
        console.log('error');
    }
}