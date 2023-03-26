import connect from "../../lib/mongodb"
import User from '../../model/user'
import SavedFolder from "../../model/savedFolder"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const user = await User.create(req.body);
        const folder = await SavedFolder.create({name: "none", recipes: [], user: user.username})
        user.saved.push(folder._id)
        console.log(user)
        console.log(folder)
        user.save()
        if(!user){
            return null;
        }
        else {
            return res.json(user);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to create a new user.'})
    }
}