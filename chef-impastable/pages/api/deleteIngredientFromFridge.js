import connect from "../../lib/mongodb"
import User from "../../model/user"
let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req,res){
    const{username, ingredient, group}=req.body;
    console.log(username, ingredient, group)
    try {
        const user = await User.findOne({username: username})
        //         const user = await User.findOneAndUpdate({username: username}, {$push: { dietaryTags: tag}}, {new: true});
        // const user = await User.findOneAndUpdate({username: username}, {$pull: {fridge: ingredient}, $pull: {fridge_grouped: ingredient}})
        console.log(user.fridge_grouped)
        var arr = user.fridge_grouped.get(group)
        var i = arr.indexOf(ingredient)
        // console.log(i)
        var fridge_group = []
        if (i != arr.length - 1) {
            fridge_group = arr.slice(0, i).concat(arr.slice(i+1))
        }
        else {
            fridge_group = arr.slice(0, i)
        }
        console.log(fridge_group)
        //user.fridge_grouped.set(group, fridge_group)
        var fridge = user.fridge
        i = fridge.indexOf(ingredient)
        var updated_fridge = []
        if (i != fridge.length - 1) {
            updated_fridge = fridge.slice(0, i).concat(fridge.slice(i+1))
        }
        else {
            updated_fridge = fridge.slice(0, i)
        }
        console.log(updated_fridge)

        // user.fridge_grouped[group] = fridge_group
        user.fridge_grouped.set(group, fridge_group)

        // console.log(group)
        // console.log(user.fridge_grouped[group])
        // console.log(user.fridge_grouped)
        user.fridge = updated_fridge
        console.log(fridge)
        console.log(user)
        user.save()
        return res.json(user)
        // return res.json({
        //     username: user.username,
        //     password: user.password,
        //     displayName: user.displayName,
        //     avatar: user.avatar,
        //     friends: user.friends,
        //     friendRequests: user.friendRequests,
        //     createdPrivacy: user.createdPrivacy,
        //     savedPrivacy: user.savedPrivacy,
        //     reviewedPrivacy: user.reviewedPrivacy,
        //     dietaryTags: user.dietaryTags
        // });
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}