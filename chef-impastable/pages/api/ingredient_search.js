import connect from "../../lib/mongodb"
import Ingredient from '../../model/ingredient'


let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {ingredient}=req.body
        const ingredientRet = await Ingredient.findOne({ingredient})
        if(!ingredientRet){
            //username not found, username not taken, return false
            return res.json({success : false});
        }
        else {
            console.log(ingredientRet);
            return res.json({success: true});
        }
    } catch (error) {
        res.status(400).json({status:'Ingredient was not found was not found'})
    }
}