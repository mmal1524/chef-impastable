import connect from "../../lib/mongodb"
import Notification from "../../model/notification"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    const{_id}=req.body;
    try {
        const notification = await Notification.findOneAndUpdate({_id: _id}, {$set: { newNotification: false}}, {new: true});
        return res.json(notification);
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}