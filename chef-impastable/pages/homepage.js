import Link from 'next/link';
import RecipeCard from '../components/recipe-card';
import Grid from '@mui/material/Grid';
import clientPromise from "../lib/mongodb";

export default function HomePage({recipes}) {
    
    // var recipes = [
    //     {
    //         title: "name",
    //         picture: "/chef-impastable-logo.jpg",
    //         description: "this is my super cool recipe",
    //         tags: ["gluten-free", "vegan"]
    //     },
    //     {
    //         title: "name",
    //         picture: "/chef-impastable-logo.jpg",
    //         description: "this is my super cool recipe i love food so much and obviously chef impastable is the best place to get your recipes",
    //         tags: ["gluten-free", "vegan"]
    //     },
    //     {
    //         title: "name",
    //         picture: "/chef-impastable-logo.jpg",
    //         description: "this is my super cool recipe",
    //         tags: ["gluten-free", "vegan"]
    //     },
    //     {
    //         title: "name",
    //         picture: "/chef-impastable-logo.jpg",
    //         description: "this is my super duper cool recipe",
    //         tags: ["gluten-free", "vegan"]
    //     },
    //     {
    //         title: "name",
    //         picture: "/chef-impastable-logo.jpg",
    //         description: "this is my super cool recipe and i want to know how if i have super different lengths of descriptions affect the size of the card so i am just going to write a mini paragraph and see what happens when i do this so i am just going to keep writing a bunch and see what happens and i hope this is enough",
    //         tags: ["gluten-free", "vegan"]
    //     },
    //     {
    //         title: "name",
    //         picture: "/chef-impastable-logo.jpg",
    //         description: "this is my super cool recipe",
    //         tags: ["gluten-free", "vegan"]
    //     },
    //     {
    //         title: "name",
    //         picture: "/chef-impastable-logo.jpg",
    //         description: "this is my super cool recipe",
    //         tags: ["gluten-free", "vegan"]
    //     },
    //     {
    //         title: "name",
    //         picture: "/chef-impastable-logo.jpg",
    //         description: "this is my super cool recipe",
    //         tags: ["gluten-free", "vegan"]
    //     },
    //     {
    //         title: "name",
    //         picture: "/chef-impastable-logo.jpg",
    //         description: "this is my super cool recipe",
    //         tags: ["gluten-free", "vegan"]
    //     },
    //     {
    //         title: "name",
    //         picture: "/chef-impastable-logo.jpg",
    //         description: "this is my super cool recipe",
    //         tags: ["gluten-free", "vegan"]
    //     },
    //     {
    //         title: "name",
    //         picture: "/chef-impastable-logo.jpg",
    //         description: "this is my super cool recipe",
    //         tags: ["gluten-free", "vegan"]
    //     },
    //     {
    //         title: "name",
    //         picture: "/chef-impastable-logo.jpg",
    //         description: "this is my super cool recipe",
    //         tags: ["gluten-free", "vegan"]
    //     },
    //     {
    //         title: "name",
    //         picture: "/chef-impastable-logo.jpg",
    //         description: "this is my super cool recipe",
    //         tags: ["gluten-free", "vegan"]
    //     },
    //     {
    //         title: "name",
    //         picture: "/chef-impastable-logo.jpg",
    //         description: "this is my super cool recipe",
    //         tags: ["gluten-free", "vegan"]
    //     },
    //     {
    //         title: "name",
    //         picture: "/chef-impastable-logo.jpg",
    //         description: "this is my super cool recipe",
    //         tags: ["gluten-free", "vegan"]
    //     },
    //     {
    //         title: "name",
    //         picture: "/chef-impastable-logo.jpg",
    //         description: "this is my super cool recipe",
    //         tags: ["gluten-free", "vegan"]
    //     },
    // ];
    
    return (
        <>
            <h1>Homepage</h1>
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