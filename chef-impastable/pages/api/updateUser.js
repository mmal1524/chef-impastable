import connect from "../../lib/mongodb"
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {username, newDisplayName, newCreatPriv, newSavPriv, newRevPriv}=req.body
        const user = await User.findOne({username})
        const update = {
            displayName: newDisplayName,
            createdPrivacy: newCreatPriv,
            savedPrivacy: newSavPriv,
            reviewedPrivacy: newRevPriv
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
                avatar: user.avatar,
                friends: user.friends,
                friendRequests: user.friendRequests,
                createdPrivacy: newCreatPriv,
                savedPrivacy: newSavPriv,
                reviewedPrivacy: newRevPriv,
                dietaryTags: user.dietaryTags
            });
        }
    } catch (error) {
        res.status(400).json({status:'Not able to update user.'})
        console.log('error');
    }
}