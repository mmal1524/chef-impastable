import { ObjectId } from "mongodb";
import connect from "../../lib/mongodb"
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {username, reviewID}=req.body
        const user = await User.findOneAndUpdate({username: username}, {$push: { reviewedRecipes: reviewID}}, {new: true});

        if (!user) {
            return null;
        }
        else {
            return res.json({
                username: user.username,
                password: user.password,
                fridge: user.fridge,
                fridge_grouped: user.fridge_grouped,
                kitchen: user.kitchen,
                displayName: user.displayName,
                avatar: user.avatar,
                friends: user.friends,
                friendRequests: user.friendRequests,
                createdPrivacy: user.createdPrivacy,
                savedPrivacy: user.savedPrivacy,
                reviewedPrivacy: user.reviewedPrivacy,
                mealPlanPrivacy: user.mealPlanPrivacy,
                dietaryTags: user.dietaryTags,
                reviewedRecipes: user.reviewedRecipes
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({status:'Not able to update user.'})
        console.log('error');
    }
}