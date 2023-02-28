import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';
//import withRouter from 'next/router';
//import { useRouter } from 'next/router';
import clientPromise from '../lib/mongodb_client';
//import { Types } from 'mongoose';
//import mongoose from 'mongoose';
import Grid from '@mui/material/Grid';
import { ObjectId } from 'mongodb';
import Navbar from './navbar.js'
import { CardMedia } from "@mui/material";

export default function Recipe({ recipe }) {
    //console.log(" recipe:")
    //console.log(recipe)
    const nutrientsArray = Object.values(recipe.nutrients);
    const nutrients = recipe.nutrients;
    //console.log(nutrients);
    const mappedIngredients = [];
    const ingredients = recipe.ingredients;
    //console.log(ingredients);
    /*for (let i = 0; i < ingredients.length; i++) {
        console.log(ingredients[i]);
        //mappedIngredients.push(ingredients[i].join(' '));
    }*/
    /*
    {mappedIngredients.map((instruction) => (
                <ul>{instruction}</ul>
            ))}*/
    return (
        <>
            <Grid>
                <div className="App">
                    <Navbar />
                </div>
                <Grid container
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <h1>{recipe.title}</h1>
                </Grid>
                <Grid container
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <CardMedia>
                        <img src={recipe.image} alt="image of {props.recipe.title}" width={300} />
                    </CardMedia>
                </Grid>
                <Grid container
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <p>Prep time: {recipe.prep_time} minutes, Total time: {recipe.total_time} minutes, Yields: {recipe.yields} </p>
                </Grid>
                <h2>
                    Instructions
                </h2>
                {recipe.instructions_list.map((instruction) => (
                    <ul>
                        <li key={instruction.toString()}>{instruction}</li>
                    </ul>
                ))}
                <h2>
                    Nutrients
                </h2>
                Calories: {nutrients.calories}
                Carbohydrate Content: {nutrients.carbohydrateContent}
                Cholesterol Content: {nutrients.cholesterolContent}
                {Object.keys(nutrients).map((key, index) => {
                    return (
                        <ul>
                            {key}: {nutrients[key]}
                        </ul>
                    );
                })}
                <h2>
                    Ingredients
                </h2>
                {recipe.ingredients.map(ingredient => (
                    <ul>
                        {ingredient.quantity} {ingredient.ingredient} {ingredient.measurement}
                    </ul>
                ))}
            </Grid>
        </>
    );
}

export async function getServerSideProps(context) {
    console.log("query: " + context.query)
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const recipe = await db
            .collection("recipes")
            .findOne(new ObjectId(`${context.query.id}`));
        return {
            props: { recipe: JSON.parse(JSON.stringify(recipe)) },
        };
    }
    catch (e) {
        console.error(e);
    }

}

