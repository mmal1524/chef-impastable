import connect from "../../lib/mongodb"
import User from "../../model/schema"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {username}=req.body
        const user = await User.findOne({username})
        if (!user) {
            return null;
        }
        else {
            return res.json(user);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to find user.'})
        console.log('error');
    }
}
