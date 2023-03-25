import connect from "../../lib/mongodb"
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {username, friend}=req.body
        const user = await User.findOneAndUpdate({username: username}, {$pull: { friends: friend}}, {new: true});
        
        if (user == null) {
            return null;
        }
        else {
            return res.json(user);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to update user.'});
        console.log('error');
    }
}