import connect from "../../lib/mongodb"
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    const{username, tag}=req.body;
    try {
        const user = await User.findOneAndUpdate({username: username}, {$push: { dietaryTags: tag}}, {new: true});
        return res.json(user);
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}