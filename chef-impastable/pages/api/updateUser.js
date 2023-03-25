import connect from "../../lib/mongodb"
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {username, newDisplayName, newAvatar, newCreatPriv, newSavPriv, newRevPriv, newMealPriv}=req.body

        const user = await User.findOneAndUpdate({username: username}, {displayName: newDisplayName, avatar: newAvatar, createdPrivacy: newCreatPriv, savedPrivacy: newSavPriv, reviewedPrivacy: newRevPriv, mealPlanPrivacy: newMealPriv}, {new: true})

        if (!user) {
            return null;
        }
        else {
            return res.json(user);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to update user.'})
        console.log('error');
    }
}