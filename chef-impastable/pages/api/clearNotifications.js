import connect from "../../lib/mongodb"
import Notification from "../../model/notification"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {receiver}=req.body
        const ret = await Notification.delete({receiver: receiver});

        if (!ret) {
            return res.json({success : false});
        } else {
            return res.json({success: true});
        }
        
    
    } catch (error) {
        res.status(400).json({status:'Not able to delete notification.'});
        console.log('error');
    }
}