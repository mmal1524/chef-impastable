import connect from "../../lib/mongodb"
import User from '../../model/schema'

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    const {username, password }=req.body;
    try {
        const user = await User.findOneAndUpdate({username: username}, {password: password});
        return res.json({
            username: user.username,
            password: user.password,
            success: true
        });
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}