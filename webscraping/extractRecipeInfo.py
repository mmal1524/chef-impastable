from urllib import request
from python_database_connection import get_database

import urllib3
from recipe_scrapers import scrape_me
from bs4 import BeautifulSoup
import urllib.request
from lxml import etree

# open file and get each url


recipe_page = request.urlopen(recipe["href"])
recipe_soup = BeautifulSoup(recipe_page, 'html.parser')

ingredient_list = recipe_soup.find_all("li", class_= "mntl-structured-ingredients__list-item")

all_ingredients = []
all_ingredients_json = []

for ingredient in ingredient_list:
    ingredient_split = []

    for element in ingredient:
        for span in element:
            for thing in span:
                ingredient_split.append(thing)

    all_ingredients.append(ingredient_split[1::2])

    for ingredients in all_ingredients:
        if len(ingredients) == 2:
            ingredients.insert(0, " ")

        ingredient_json = dict()
        ingredient_json["ingredient"] = ingredients[2]
        ingredient_json["quantity"] = ingredients[0]
        ingredient_json["measurement"] = ingredients[1]
        all_ingredients_json.append(ingredient_json)

#print(all_ingredients)
print(ingredient_json)
recipes_ingredients.append(all_ingredients)
recipe_scrape = scrape_me(recipe["href"])
#print(recipe_scrape.to_json())
print(recipe["href"])
recipe_json = recipe_scrape.to_json();
recipe_json["ingredients"] = all_ingredients_json;
print(recipe_json)
#collection_name.insert_one(recipe_json)
#break