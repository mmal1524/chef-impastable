import connect from "../../lib/mongodb"
import User from "../../model/user"
import SavedFolder from "../../model/savedFolder"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {username, folder}=req.body
        const user = await User.findOne({username: username});
        
        const newFolder = await SavedFolder.create({name: folder, recipes: [], user: user.username});

        user.saved.push(newFolder._id);
        user.save();
        
        if (!user) {
            return null;
        }
        else {
            console.log(user);
            return res.json(user);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to update user.'})
        console.log('error');
    }
}