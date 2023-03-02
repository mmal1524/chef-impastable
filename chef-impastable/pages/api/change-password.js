import connect from "../../lib/mongodb"
import User from '../../model/user'

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    const {username, password }=req.body;
    try {
        const user = await User.findOneAndUpdate({username: username}, {password: password});
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
            success: true
        });
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}