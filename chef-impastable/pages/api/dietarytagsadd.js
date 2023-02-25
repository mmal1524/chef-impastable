import connect from "../../lib/mongoose"
import User from "../../model/schema"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    const{username, tag}=req.body;
    try {
        console.log(tag);
        console.log(username);
        const user = await User.findOneAndUpdate({username: username}, {$push: { dietaryTags: tag}});
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