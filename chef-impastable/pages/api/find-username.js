import connect from "../../lib/mongodb"
import User from '../../model/schema'

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {username}=req.body
        const name = await User.findOne({username})
        if(!name){
            return res.json({success : true});
        }
        else {
            return res.json({success: false});
        }
    } catch (error) {
        res.status(400).json({status:'User was not found'})
    }
}