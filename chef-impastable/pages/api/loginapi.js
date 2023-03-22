import connect from "../../lib/mongodb"
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()
export default async function handler(req,res){
    try {
        const {username, password}=req.body
        const user = await User.findOne({username, password})
        console.log(user)
        console.log(user.fridge_grouped);
        if (!user) {
            return res.json({success: false});
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
                saved: user.saved,
                success: true,
                reviewedRecipes: user.reviewedRecipes
            });
        }
    } catch (error) {
        res.status(400).json({status:'Not able to create a new user.'})
        console.log('error');
    }
}