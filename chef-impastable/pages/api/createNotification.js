import connect from "../../lib/mongodb"
import Notification from "../../model/notification"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const notification = await Notification.create(req.body);
        if (!notification) {
            return null;
        }
        else {
            return res.json({
                notificationID: notification._id
            });
        }
    } catch (error) {
        res.status(400).json({status:'Not able to create new notification.'})
        console.log('error');
    }
}