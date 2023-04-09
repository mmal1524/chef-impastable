import * as React from 'react';
import clientPromise from '../lib/mongodb_client';
import Navbar from './navbar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { ListItem } from '@mui/material';

export default function MealPlan() {
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

        const user = await db
            .collection("users")
            .findOne({username: context.query.username});

        var mealPlanNames = user.mealPlans;

        var mealPlans = new Array(mealPlanNames.length);
        var i = 0;
        for (i; i < mealPlanNames.length; i++) {
            var mealPlan = await db
                .collection("mealplans")
                .findOne({name: mealPlanNames[i], user: context.query.username})
            mealPlans[i] = JSON.parse(JSON.stringify(mealPlan))
        }

        var recipes = new Array(mealPlanNames.length);
        for (i = 0; i < mealPlanNames.length; i++) {
            recipes[i] = new Array(7);
        }


    }
    catch (e) {
        console.error(e);
    }
}