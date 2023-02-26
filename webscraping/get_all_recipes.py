from urllib import request
from python_database_connection import get_database

import urllib3
from recipe_scrapers import scrape_me
from bs4 import BeautifulSoup
import urllib.request
from lxml import etree

opened = urllib.request.urlopen("https://www.allrecipes.com/recipes-a-z-6735880")
soup = BeautifulSoup(opened, 'html.parser')

dbname = get_database()
collection_name = dbname["recipes"]

# get links to alphabetized subgroups of recipe types
links_from_a_z = soup.find_all("a", class_ ="link-list__link")
print(len(links_from_a_z))
recipes = []
recipes_ingredients = []

# open file
f = open("recipeUrlList.txt", "a")

# loop through links from a-z list that are categories of food (i.e. airfryer recipes, pasta, etc.)
for link in links_from_a_z:
    opened_a_z_link = urllib.request.urlopen(link["href"])
    a_z_soup = BeautifulSoup(opened_a_z_link, 'html.parser')
    #print(a_z_soup.prettify())

    # loop through the categories to get their further subcategories (i.e. main-dish, snacks, etc.)
    subgroup_links = a_z_soup.find_all("a", class_ = "taxonomy-nodes__link")
    for sub_link in subgroup_links:
        opened_sub_link = urllib.request.urlopen(sub_link["href"])
        sub_link_soup = BeautifulSoup(opened_sub_link, 'html.parser')

        # loop through each category to find all the links to the recipes for that page
        recipe_links = sub_link_soup.find_all("a", class_ = "mntl-card-list-items")
        for recipe in recipe_links:
            # print(recipe)
            # print(recipe["href"])
            # add the link to a list of all recipes at that point
            if recipe["href"] not in recipes:
                recipes.append(recipe["href"])
                f.write(recipe["href"] + "\n")
            # TODO - check the list of links for duplicates before webscraping
            #      - webscrape each link and add to database
        # print(recipes)
        # print(len(recipes))


#print(recipes)
#print(len(recipes))
#print(links)

#print(soup.prettify())
print(recipes_ingredients)

