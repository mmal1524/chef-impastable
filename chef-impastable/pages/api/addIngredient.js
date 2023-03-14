import connect from "../../lib/mongodb"
import Ingredient from '../../model/ingredient'
import User from "../../model/user"


let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    const user = await User.findOne({username: req.body.username})

    try {
        const ingredient=req.body.ingredient
        const ingredientRet = await Ingredient.findOne({ingredient})
        const user = await User.findOne({username: req.body.username})
        if(!ingredientRet){
            // ingredient needs to be added to the database
            Ingredient.create({ingredient: ingredient})
        }
        // Check if group is already in the users fridge groups
        user.save()

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
        res.status(400).json(user)
    }
}