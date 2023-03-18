import { ObjectId } from "mongodb";
import connect from "../../lib/mongodb"
import User from "../../model/user"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    try {
        const {username, reviewID}=req.body
        console.log(typeof username);
        console.log(username);
        console.log(reviewID);
        console.log(typeof reviewID)

        // const user = await User.findOne({username: username}, function (err, doc){
        //     if (err) return done(err);
        //     // Create the new field if it doesn't exist yet
        //     doc.reviews || (doc.reviews = []);
        //     doc.reviews.push(reviewID);

        //     doc.save();
        // });

        const user = await User.findOne({username: username});
        if (!user.reviews) {
            user.reviews = [];
        }
        user.reviews.push(reviewID);
        user.save();

        // const user = await User.findOneAndUpdate({username: username}, {$push: { reviews: reviewID}}, {new: true});
        // console.log("HERE");
        // console.log("user:")
        // console.log(user);
        // console.log("user reviews:")
        // console.log(user.reviews);
        
        // if (!user) {
        //     return null;
        // }
        // else {
        //     console.log(user);
        //     return res.json({success: true});
        // }
    } catch (error) {
        console.log(error);
        res.status(400).json({status:'Not able to update user.'})
        console.log('error');
    }
}