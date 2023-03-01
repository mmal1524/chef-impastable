import connect from "../../lib/mongodb"
import User from '../../model/user'

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {username}=req.body
        const name = await User.findOne({username})
        if(!name){
            //username not found, username not taken, return false
            return res.json({success : false});
        }
        else {
            console.log(name);
            return res.json({success: true});
        }
    } catch (error) {
        res.status(400).json({status:'User was not found'})
    }
}