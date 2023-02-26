from recipe_scrapers import scrape_me

class Recipe:
    def __init__(self, recipeIngredients, reviews, creator, description, steps, nutritionFacts, servings):
        recipeIngredients = []
        reviews = []
        creator = ''
        description = ''
        steps = []
        nutritionFacts = ''
        servings = 0

scraper0 = scrape_me('https://www.allrecipes.com/recipe/65691/pumpkin-waffles-with-apple-cider-syrup/')
scraper1 = scrape_me('https://www.allrecipes.com/recipe/158968/spinach-and-feta-turkey-burgers/')
scraper2 = scrape_me('https://www.allrecipes.com/recipe/238691/simple-macaroni-and-cheese/')
scraper3 = scrape_me('https://www.allrecipes.com/recipe/147103/delicious-egg-salad-for-sandwiches/')
scraper4 = scrape_me('https://www.allrecipes.com/recipe/8532495/roasted-broccoli-soup/')
scraper5 = scrape_me('https://www.allrecipes.com/recipe/8506869/shortcut-vegetarian-hot-pot-broth/')
scraper6 = scrape_me('https://www.allrecipes.com/recipe/14685/slow-cooker-beef-stew-i/')
scraper7 = scrape_me('https://www.allrecipes.com/recipe/13107/miso-soup/')
scraper8 = scrape_me('https://www.allrecipes.com/recipe/276001/air-fried-crispy-fish-po-boys-with-chipotle-slaw/')
scraper9 = scrape_me('https://www.allrecipes.com/recipe/12009/creamy-cajun-chicken-pasta/')
scraper10 = scrape_me('https://www.allrecipes.com/recipe/8508761/southwest-chicken-salad/')

recipe1 = Recipe(scraper1.ingredients(), [1, 2, 3], 'me', 'cool', [1, 3, 9], 'idk calories', 2)
#print(recipe1)

#print(scraper0.title())
#pkrint(scraper0.instructions_list())

# title = scraper.title()
# ingredients = scraper.ingredients()
# nutrients = scraper.nutrients()
# links = scraper.links()
# instructions = scraper.instructions_list()
# yields = scraper.yields()
# json_thing = scraper.to_json()

print(scraper0.to_json())

#from python_database_connection import get_database

#dbname = get_database()
#collection_name = dbname["recipes"]

#collection_name.insert_many([scraper1.to_json(), scraper2.to_json(), scraper3.to_json(), scraper4.to_json(), scraper5.to_json(), scraper6.to_json(), scraper7.to_json(), scraper8.to_json(), scraper9.to_json(), scraper10.to_json()])
