import connect from "../../lib/mongodb"
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    const{username, app}=req.body;
    try {
        const user = await User.findOneAndUpdate({username: username}, {$push: { kitchen: app}}, {new: true});
        return res.json({
            username: user.username,
            password: user.password,
            kitchen: user.kitchen
        });
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}