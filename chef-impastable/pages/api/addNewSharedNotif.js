import connect from "../../lib/mongodb"
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {sender, receiver}=req.body
        console.log(sender)

        const data = await User.findOneAndUpdate({username: receiver}, {$push: { newSharedNotif: sender}}, {new: true})

        if (!data) {
            return null;
        }
        else {
            return res.json(data);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to update user.'})
        console.log('error');
    }
}