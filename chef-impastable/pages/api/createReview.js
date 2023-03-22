import connect from "../../lib/mongodb"
import Review from "../../model/review"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const review = await Review.create(req.body);
        if (!review) {
            return null;
        }
        else {
            return res.json({
                reviewID: review._id
            });
        }
    } catch (error) {
        res.status(400).json({status:'Not able to create new review.'})
        console.log('error');
    }
}