import connect from "../../lib/mongoose"
import User from "../../model/schema"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    const{username, tag}=req.body;
    try {
        const user = await User.findOneAndUpdate({username: username}, {$pull: { dietaryTags: tag}});
        //const user = await User.findOne({username: username});
        //const update = {$pull: { dietaryTags: tag} };
        //const result = await User.findOneAndUpdate({username: username}, update);
        return res.json({
            username: user.username,
            password: user.password,
            dietaryTags: user.dietaryTags
        });
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}