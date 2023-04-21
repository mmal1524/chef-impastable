import connect from "../../lib/mongodb"
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    const{username}=req.body;
    try {
        const user = await User.findOneAndUpdate({username: username}, {$set: { newFriendNotif: [], newSharedNotif: []}}, {new: true});
        console.log(user);
        return res.json(user);
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}