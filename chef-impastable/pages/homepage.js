import Link from 'next/link';
import RecipeCard from '../components/recipe-card';
import Grid from '@mui/material/Grid';
import { ImageList, ImageListItem } from '@mui/material'
import clientPromise from "../lib/mongodb_client";
import Navbar from './navbar';
import { useEffect, useState } from 'react';
import React from 'react';
import SaveRecipeDialog from '../components/saveRecipeDialog';
import { useRouter } from "next/router";


export default function HomePage({ recipes }) {
    const [displayRecipes, setDisplayRecipes] = useState(recipes);
    const [showSaveOption, setShowSaveOptions] = useState(false);
    const [recipeID, setRecipeID] = useState("");
    const [folders, setFolders] = useState([]);
    const [folderNames, setFolderNames] = useState([]);
    const [recipeIndex, setRecipeIndex] = useState(-1);
    const router = useRouter();
    const [recipeResults, setRecipeResults] = useState([]);

    //api call to get results of search when requested
    async function fetchdata(searchTerm) {
        const recipes = await SearchRecipe(searchTerm);
        setRecipeResults(recipes);
    }

    useEffect(() => {
        //if the user searches something, update display with those recipes
        //else, display default recipes.
        if (router.query.searchTerm) {
            const searchTerm = router.query.searchTerm;
            fetchdata(searchTerm);
        }
        else {
            setRecipeResults(recipes);
        }
      }, [router.query.searchTerm]);

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
    }, [])
    //  debugger;
    return (
        <>
            <SaveRecipeDialog
                onSubmit={async (folderName) => {
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
                    setShowSaveOptions(false);
                    setRecipeID("");
                }}
                show={showSaveOption}
                options={folderNames}
                onClose={() => { setShowSaveOptions(false) }}
            />
            <div>
                <Navbar />
            </div>
            <p></p>
            <div>
                <Grid container spacing={3}>
                    {/* display recipes */}
                    { recipeResults && recipeResults.map((recipe, index) => (
                        <Grid item key={recipe._id}>
                            {console.log("here")}
                            <RecipeCard
                                recipe={recipe}
                                index={index}
                                onSave={() => {
                                    if (!recipe.saved) {
                                        setShowSaveOptions(true);
                                        setRecipeID(recipe._id);
                                        setRecipeIndex(index);
                                    }
                                    else {
                                        unsaveRecipe(JSON.parse(localStorage.getItem("user")).username, recipe._id);
                                        displayRecipes[index].saved = !displayRecipes[index].saved;
                                        setDisplayRecipes(displayRecipes);
                                        setRecipeID(recipe._id);
                                    }
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
}

async function getFolders(user_id) {
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
    return data;
}

async function saveRecipe(username, folder, recipeID) {
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
            props: { recipes: JSON.parse(JSON.stringify(recipes)) },
        };
    }
    catch (e) {
        console.error(e);
    }
}
async function SearchRecipe(search) {
    try {
        const res = await fetch('/api/searchRecipe', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                search: search
            })
        })
        const data = await res.json();
        return data;
    } catch {
        return error
    }
}