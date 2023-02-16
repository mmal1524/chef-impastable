import connect from "../../lib/mongodb"
import User from '../../model/schema'

connect()

export default async function handler(req,res){
    try {
        console.log('hey ');
        const {username, password}=req.body
        const user = await User.findOne({username, password})
        if (!user) {
            return res.json({status:'Not able to find the user'})
        }
        else {
            res.redirect('/sign-up')
        }
    } catch (error) {
        res.status(400).json({status:'Not able to create a new user.'})
    }
}