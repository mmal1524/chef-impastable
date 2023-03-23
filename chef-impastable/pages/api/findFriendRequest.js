import connect from "../../lib/mongodb"
import User from '../../model/user'

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {username, friendRequest}=req.body
        const exists = await User.findOne({username: username, friendRequests: friendRequest})
        if(!exists){
            //friendRequest does not exist
            return res.json({success : false});
        }
        else {
            return res.json({success: true});
        }
    } catch (error) {
        res.status(400).json({status:'findFriendRequest error'})
    }
}