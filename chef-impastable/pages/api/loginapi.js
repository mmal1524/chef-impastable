import connect from "../../lib/mongodb"
import User from "../../model/schema"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {username, password}=req.body
        const user = await User.findOne({username, password})
        if (!user) {
            return res.json({success: false});
        }
        else {
            return res.json({success: true});
        }
    } catch (error) {
        res.status(400).json({status:'Not able to create a new user.'})
        console.log('error');
    }
}