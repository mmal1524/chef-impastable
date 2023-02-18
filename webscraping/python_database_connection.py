# Connecting python and mongodb steps: https://www.mongodb.com/languages/python
from pymongo import MongoClient

def get_database():
    client = MongoClient("mongodb+srv://mm17:cs307@chefimpastable.pt7a3pm.mongodb.net/?retryWrites=true&w=majority")
    return client['test']

dbname = get_database()
collection_name = dbname["recipes"]

fake_recipe = {
    "title" : "waffle",
    "servings" : 2
}

collection_name.insert_one(fake_recipe)