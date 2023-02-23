import Link from 'next/link';
import RecipeCard from '../components/recipe-card';
import Grid from '@mui/material/Grid';
import clientPromise from "../lib/mongodb_client";
import Navbar from './navbar';

export default function HomePage({recipes}) {
    return (
        <>
            <Navbar />
            <Grid container spacing={3}>
                
                {recipes.map((recipe) => (                
                    <Grid item>
                        <RecipeCard recipe={recipe}/>
                    </Grid>
                )
                    
                )}
            </Grid>
        </>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const recipes = await db.collection("recipes").find({}).toArray();
        //console.log(recipes);
        return {
            props: {recipes: JSON.parse(JSON.stringify(recipes))},
        };
    }
    catch (e) {
        console.log("ERROR!!!!!!!")
        console.error(e);
    }
    
}