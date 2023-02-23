import connect from "../../lib/mongodb"
import User from "../../model/schema"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const users = await User.find().toArray();
        res.json(users);
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}