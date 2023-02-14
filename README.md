# chef-impastable

## Setting up the database on your local environment:
1. In both the Database and Network access tab of the MongoDB website, click on the popup to add your current IP address. If you move locations and try to work on code, you will need to repeat this step in order to give your current location DB access.
2. Under Quickstart, create a username and password.
3. Go to the Database tab, click the connect button next to Chef Impastable, and click the "Connect your application" button. Copy the text which should be "mongodb+srv://<username>:<password>@chefimpastable.pt7a3pm.mongodb.net/?retryWrites=true&w=majority"
4. In your repository, create a file named .env.local and paste the text here. Replace <username> and <password> with your username and password, and remember to delete the brackets (<, >). 

## Running on your local machine
1. cd to chef-impastable
2. [first time only] run "npm install"
3. run "npm run dev", you can see the webpage at localhost:3000

## Updating your branch to have most recent code
1. git fetch
2. git pull origin main
