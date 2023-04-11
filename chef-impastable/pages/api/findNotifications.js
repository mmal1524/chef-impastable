import connect from "../../lib/mongodb"
import Notification from "../../model/notification"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        // get passed a receiver username and then find all of the notifications that they received to display.
        const {username}=req.body;
        const notification = await Notification.findOne({username});
        
        if (notification == null) {
            return res.json({success: false});
        } 
        
        return res.json(notification);
    } catch (error) {
        res.status(400).json({status:'Not able to find a notification.'})
        console.log('error');
    }
}