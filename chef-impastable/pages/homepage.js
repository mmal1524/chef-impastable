import Link from 'next/link';
import RecipeCard from '../components/recipe-card';
import Grid from '@mui/material/Grid';
import { ImageList, ImageListItem } from '@mui/material'
import clientPromise from "../lib/mongodb_client";
import Navbar from './navbar';
import { useEffect } from 'react';
import React from 'react';


export default function HomePage(props) {
    //console.log(props.recipes)
    return (
        <> 
            <div>
                <Navbar />
            </div>
            <p></p>
            <div>
                <Grid container spacing={3}>
                    
                    {props.recipes.map((recipe) => (                
                        <Grid item key={recipe._id}>
                            <RecipeCard recipe={recipe}/>
                        </Grid>
                    )
                        
                    )}
                </Grid>
            </div>   
        </>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const recipes = await db
            .collection("recipes")
            .find({})
            .limit(20)
            .toArray();
        return {
            props: {recipes: JSON.parse(JSON.stringify(recipes))}, 
        };
    }
    catch (e) {
        console.error(e);
    }
    
}
