import connect from "../../lib/mongodb"
import User from '../../model/user'

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    const {username, password }=req.body;
    try {
        const user = await User.findOneAndUpdate({username: username}, {password: password}, {new: true});
        if (!user) {
            return res.json({success: false})
        }
        return res.json(user);
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}