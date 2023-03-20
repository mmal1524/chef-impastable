import connect from "../../lib/mongodb"
import Recipe from "../../model/recipe"

let mongoose = require('mongoose')
mongoose.set('strictQuery', false);
connect()

export default async function handler(req, res) {
    const { title, tag, exists, isDefined } = req.body;
    const recipeTags = [
        {
            "tag": "Vegan",
            "exists": false
        },
        {
            "tag": "Vegetarian",
            "exists": false
        },
        {
            "tag": "Keto",
            "exists": false
        },
        {
            "tag": "Kosher",
            "exists": false
        },
        {
            "tag": "Paleo",
            "exists": false
        },
        {
            "tag": "Pescetarian",
            "exists": false
        },
        {
            "tag": "Halal",
            "exists": false
        },
        {
            "tag": "Dairy Free",
            "exists": false
        },
        {
            "tag": "Gluten Free",
            "exists": false
        },
        {
            "tag": "Nut Free",
            "exists": false
        },
        {
            "tag": "Wheat free",
            "exists": false
        },
        {
            "tag": "Fish free",
            "exists": false
        },
        {
            "tag": "Shellfish free",
            "exists": false
        },
        {
            "tag": "Egg free",
            "exists": false
        },
    ];
    try {
        console.log(isDefined)
        if (!isDefined) {
            const recipe = await Recipe.findOneAndUpdate({ title: title },  { $push: { tags: { $each: recipeTags } } }, { new: true });
            return res.json({
                tags: recipe.tags
            });
        }
        const recipe = await Recipe.findOneAndUpdate({ title: title, "tags.tag": tag }, { $set: { "tags.$.exists": exists } }, { new: true });
        return res.json({
            tags: recipe.tags,
            exists: recipe.exists
        });
    } catch (error) {
        res.status(400).json()
        console.log('error');
    }
}