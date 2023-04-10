import * as React from 'react';
import clientPromise from '../lib/mongodb_client';
import Navbar from './navbar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { ListItem } from '@mui/material';
import { ObjectId } from 'mongodb';

export default function MealPlan({mealPlans, recipes}) {
    return (
        <>
            <div className="App">
                    <Navbar />
            </div>
            <div>
                <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    <h4>Sunday</h4>
                    <h4>Monday</h4>
                    <h4>Tuesday</h4>
                    <h4>Wednesday</h4>
                    <h4>Thursday</h4>
                    <h4>Friday</h4>
                    <h4>Saturday</h4>
                </Stack>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    try {

        const client = await clientPromise;
        const db = client.db("test");

        // obtaining current user
        const user = await db
            .collection("users")
            .findOne({username: context.query.username});

        console.log("USER:")
        console.log(user);

        // obtaining names of user's meal plans
        var mealPlanNames = user.mealPlans;

        console.log("MEAL PLAN NAMES:");
        console.log(mealPlanNames);

        // obtaining meal plan objects from meal plan names
        var mealPlans = new Array(mealPlanNames.length);
        var i = 0;
        for (i; i < mealPlanNames.length; i++) {
            var mealPlan = await db
                .collection("mealplans")
                .findOne({name: mealPlanNames[i], user: context.query.username})
            mealPlans[i] = JSON.parse(JSON.stringify(mealPlan))
        }
        console.log("MEAL PLANS:");
        console.log(mealPlans);

        // obtaining recipes objects from recipe id's within each meal plan
        // recipes[i][j] = meal plan i, day j
        var recipes = new Array(mealPlanNames.length);  
        for (i = 0; i < mealPlanNames.length; i++) {
            recipes[i] = new Array(7);  //
        }                                              
        console.log(recipes);

        for (i = 0; i < mealPlanNames.length; i++) {
            var sundayRecipeIds = mealPlans[i].Sunday;
            var sundayRecipes = new Array(sundayRecipeIds.length);
            var mondayRecipeIds = mealPlans[i].Monday;
            var mondayRecipes = new Array(mondayRecipeIds.length);
            var tuesdayRecipeIds = mealPlans[i].Tuesday;
            var tuesdayRecipes = new Array(tuesdayRecipeIds.length);
            var wednesdayRecipeIds = mealPlans[i].Wednesday;
            var wednesdayRecipes = new Array(wednesdayRecipeIds.length);
            var thursdayRecipeIds = mealPlans[i].Thursday;
            var thursdayRecipes = new Array(thursdayRecipeIds.length);
            var fridayRecipeIds = mealPlans[i].Friday;
            var fridayRecipes = new Array(fridayRecipeIds.length);
            var saturdayRecipeIds = mealPlans[i].Saturday;
            var saturdayRecipes = new Array(saturdayRecipeIds.length);

            
            var j = 0;
            for (j = 0; j < sundayRecipeIds.length; j++) {
                var recipe = await db
                    .collection("recipes")
                    .findOne({_id: new ObjectId(sundayRecipeIds[j])});
                sundayRecipes[j] = recipe;
            }
            recipes[i][0] = sundayRecipes;

            for (j = 0; j < mondayRecipeIds.length; j++) {
                var recipe = await db
                    .collection("recipes")
                    .findOne({_id: new ObjectId(mondayRecipeIds[j])});
                mondayRecipes[j] = recipe;
            }
            recipes[i][1] = mondayRecipes;

            for (j = 0; j < tuesdayRecipeIds.length; j++) {
                var recipe = await db
                    .collection("recipes")
                    .findOne({_id: new ObjectId(tuesdayRecipeIds[j])});
                tuesdayRecipes[j] = recipe;
            }
            recipes[i][2] = tuesdayRecipes;

            for (j = 0; j < wednesdayRecipeIds.length; j++) {
                var recipe = await db
                    .collection("recipes")
                    .findOne({_id: new ObjectId(wednesdayRecipeIds[j])});
                wednesdayRecipes[j] = recipe;
            }
            recipes[i][3] = wednesdayRecipes;

            for (j = 0; j < thursdayRecipeIds.length; j++) {
                var recipe = await db
                    .collection("recipes")
                    .findOne({_id: new ObjectId(thursdayRecipeIds[j])});
                thursdayRecipes[j] = recipe;
            }
            recipes[i][4] = thursdayRecipes;

            for (j = 0; j < fridayRecipeIds.length; j++) {
                var recipe = await db
                    .collection("recipes")
                    .findOne({_id: new ObjectId(fridayRecipeIds[j])});
                fridayRecipes[j] = recipe;
            }
            recipes[i][5] = fridayRecipes;

            for (j = 0; j < saturdayRecipeIds.length; j++) {
                var recipe = await db
                    .collection("recipes")
                    .findOne({_id: new ObjectId(saturdayRecipeIds[j])});
                saturdayRecipes[j] = recipe;
            }
            recipes[i][6] = saturdayRecipes;
        }

        console.log(recipes);

        return {
            props: { mealPlans: mealPlans, recipes: recipes },
        };

    }
    catch (e) {
        console.error(e);
    }
}