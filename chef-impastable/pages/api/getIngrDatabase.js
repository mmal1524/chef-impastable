import connect from "../../lib/mongodb"
import Ingredient from "../../model/ingredient";

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function getSavedFolders(req,res){
    try {
        var ingr = await Ingredient.find();
        if (!ingr) {
            res.status(400).json({status: "Not able to find Ingr"});
        }
        else {
            // console.log(folders);
            return res.json(ingr);
        }
    } catch (error) {
        res.status(400).json({status:'Not able to find Ingr'});
        console.log('error');
    }
}