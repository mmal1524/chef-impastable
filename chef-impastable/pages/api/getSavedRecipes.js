import connect from "../../lib/mongodb"
import SavedFolder from "../../model/savedFolder";

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function getSavedFolders(req,res){
    try {
        const username=req.body.user;
        const folders = await SavedFolder.find({user: username});
        console.log(folders);
        if (!folders) {
            res.status(400).json({status: "Not able to find folders"});
        }
        else {
            return res.json(folders);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to find folders'});
        console.log('error');
    }
}
