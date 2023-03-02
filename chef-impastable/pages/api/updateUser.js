import connect from "../../lib/mongodb"
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {username, newDisplayName, newAvatar, newCreatPriv, newSavPriv, newRevPriv, newMealPriv}=req.body
        const user = await User.findOne({username})
        const update = {
            displayName: newDisplayName,
            avatar: newAvatar,
            createdPrivacy: newCreatPriv,
            savedPrivacy: newSavPriv,
            reviewedPrivacy: newRevPriv,
            mealPlanPrivacy: newMealPriv
        }
        await user.updateOne(update)
        if (!user) {
            return null;
        }
        else {
            return res.json({
                username: user.username,
                password: user.password,
                displayName: newDisplayName,
                avatar: newAvatar,
                friends: user.friends,
                friendRequests: user.friendRequests,
                createdPrivacy: newCreatPriv,
                savedPrivacy: newSavPriv,
                reviewedPrivacy: newRevPriv,
                mealPlanPrivacy: newMealPriv,
                dietaryTags: user.dietaryTags
            });
        }
    } catch (error) {
        res.status(400).json({status:'Not able to update user.'})
        console.log('error');
    }
}