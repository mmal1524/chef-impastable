import connect from "../../lib/mongodb"
import Share from "../../model/share"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const share = await Share.create(req.body);
        if (!share) {
            return null;
        }
        else {
            return res.json({
                shareID: share._id
            });
        }
    } catch (error) {
        res.status(400).json({status:'Not able to create new share.'})
        console.log('error');
    }
}