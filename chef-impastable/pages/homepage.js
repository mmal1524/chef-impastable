import Link from 'next/link';
import RecipeCard from '../components/recipe-card';
import Grid from '@mui/material/Grid';
import { ImageList, ImageListItem } from '@mui/material'
import clientPromise from "../lib/mongodb_client";
import Navbar from './navbar';
import { useEffect, useState } from 'react';
import React from 'react';
import SaveRecipeDialog from '../components/saveRecipeDialog';

export default function HomePage({recipes}) {    
    const [displayRecipes, setDisplayRecipes] = useState(recipes);
    const [showSaveOption, setShowSaveOptions] = useState(false);
    const [recipeID, setRecipeID] = useState("");
    const [folders, setFolders] = useState([]);
    const [folderNames, setFolderNames] = useState([]);
    const [recipeIndex, setRecipeIndex] = useState(-1);

    useEffect(() => {
        // debugger;
        //console.log(recipes)
        var thisUser = JSON.parse(localStorage.getItem("user"))
        var saved = thisUser.saved
        async function getSavedFolders() {
            var f = await getFolders(thisUser.username)
            setFolders(f)
            var fNames = [];
            f.forEach(folder => {
                fNames.push(folder.name);
            });
            setFolderNames(fNames);
            displayRecipes.forEach(recipe => {
                // console.log(recipe)
                recipe.saved = false;
                
                f.forEach(sf => {
                    if (sf.recipes.includes(recipe._id)) {
                        recipe.saved = true
                    }
                });
            });
            // console.log(recipes);
            setDisplayRecipes(recipes);
        }
        getSavedFolders();
        console.log(thisUser)
        console.log(saved)
    }, [])
    //  debugger;
    return (
        <> 
            <SaveRecipeDialog
                onSubmit = {async (folderName) => {
                    var data = await saveRecipe(JSON.parse(localStorage.getItem("user")).username, folderName, recipeID); 
                    if (data) {
                        localStorage.setItem('user', JSON.stringify(data));
                    }
                    if (!folderNames.includes(folderName)) {
                        folderNames.push(folderName);
                        setFolderNames(folderNames);
                    }
                    displayRecipes[recipeIndex].saved = !displayRecipes[recipeIndex].saved;
                    setDisplayRecipes(displayRecipes);
                    console.log("submit button clicked"); 
                    setShowSaveOptions(false);
                    setRecipeID("");
                }}
                show = {showSaveOption}
                options = {folderNames}
                onClose = {() => {console.log("hide save recipe"); setShowSaveOptions(false)}}
            />
            <div>
                <Navbar />
            </div>
            <p></p>
            <div>
                <Grid container spacing={3}>
                    
                    {props.displayRecipes.map((recipe, index) => (                
                        <Grid item key={recipe._id}>
                            <RecipeCard 
                                recipe={recipe}
                                onSave={() => {
                                    if (!recipe.saved) {
                                        console.log("show save dialog"); 
                                        setShowSaveOptions(true); 
                                        setRecipeID(recipe._id); 
                                        setRecipeIndex(index);
                                    }
                                    else {
                                        console.log("unsave recipe");
                                        unsaveRecipe(JSON.parse(localStorage.getItem("user")).username, recipe._id);
                                        displayRecipes[index].saved = !displayRecipes[index].saved;
                                        setDisplayRecipes(displayRecipes);
                                        setRecipeID(recipe._id);
                                    }
                                }}
                            />
                        </Grid>
                    )
                        
                    )}
                </Grid>
            </div>   
        </>
    );
}

async function getFolders(user_id) {
    console.log(user_id);
    const res = await fetch('/api/getSavedRecipes', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: user_id,
            getData: false
        })
    })
    const data = await res.json();
    console.log(data);
    return data;
}

async function saveRecipe(username, folder, recipeID) {
    console.log({username, folder, recipeID});
    const res = await fetch('/api/saveRecipe', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            folder: folder,
            recipeID: recipeID
        })
    })
    const data = await res.json();
    console.log(data);
    return data;
}

async function unsaveRecipe(username, recipeID) {
    console.log({username, recipeID});
    const res = await fetch('/api/unsaveRecipe', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            recipeID: recipeID
        })
    })
    const data = await res.json();
    // console.log(data);
    return data;
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
