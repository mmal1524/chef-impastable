import connect from "../../lib/mongodb"
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {username}=req.body
        const ret = await User.deleteOne({username: username});

        if (!ret) {
            return res.json({success : false});
        } else {
            return res.json({success: true});
        }
        
    
    } catch (error) {
        res.status(400).json({status:'Not able to delete user.'});
        console.log('error');
    }
}