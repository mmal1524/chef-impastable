import connect from "../../lib/mongodb"
import Ingredient from '../../model/ingredient'
import User from "../../model/user"


let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const ingredient=req.body.ingredient
        const group = req.body.group
        console.log(ingredient, group)
        console.log(ingredient);
        const ingredientRet = await Ingredient.findOne({ingredient})
        console.log(ingredientRet)
        const user = await User.findOne({username: req.body.username})
        console.log(user.fridge)
        // console.log((user.fridge_grouped.get("nothing")))
        if(!ingredientRet){
            // ingredient needs to be added to the database
            Ingredient.create({ingredient: ingredient})
        }
        console.log("ingredient check")
        // Check if group is already in the users fridge groups
        if (!user.fridge_grouped.get(group)) {
            console.log("group exists")
            console.log(user)
            user.fridge_grouped.set(group, [ingredient])
        }
        else {
            var fridge_group = user.fridge_grouped.get(group)
            fridge_group.push(ingredient)
            user.fridge_grouped.set(group, fridge_group)
        }
        user.fridge.push(ingredient)
        user.save()
        console.log("end of if/else")

        return res.json({
            username: user.username,
            password: user.password,
            displayName: user.displayName,
            avatar: user.avatar,
            friends: user.friends,
            friendRequests: user.friendRequests,
            createdPrivacy: user.createdPrivacy,
            savedPrivacy: user.savedPrivacy,
            reviewedPrivacy: user.reviewedPrivacy,
            dietaryTags: user.dietaryTags,
            fridge: user.fridge,
            kitchen: user.kitchen,
            fridge_grouped: user.fridge_grouped
        });

        //console.log(u)
    } catch (error) {
        res.status(400).json({status:'Error in adding ingredient to user fridge'})
    }
}