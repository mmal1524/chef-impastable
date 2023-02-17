import connect from "../../lib/mongodb"
import User from '../../model/schema'

export default async function handler(req, res) {

    connect()
    
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user })
        //res.redirect('/home')
        if(!user){
            return res.json({ "code":'User not created' })
        }
    } catch (error) {
        res.status(400).json({ status:'Not able to create a new user.' })
    }
}