// import Link from 'next/link';
import RecipeCard from '../components/recipe-card';
import Grid from '@mui/material/Grid';
import { Dialog, DialogTitle, DialogContent, Button, IconButton, TextField } from '@mui/material';
// import { ImageList, ImageListItem } from '@mui/material'
// import clientPromise from "../lib/mongodb_client";
import { useEffect, useState } from 'react';
import React from 'react';
import { Add } from '@mui/icons-material';
import SaveRecipeDialog from './saveRecipeDialog';

export default function SavedRecipes() {
    const [folders, setFolders] = useState([]);
    const [currFolder, setCurrFolder] = useState({name: "", recipes: []});

    const [inFolder, setInFolder] = useState(false);
    const [noneIndex, setNoneIndex] = useState(-1);
    const [showAddFolder, setAddFolder] = useState(false);
    const [newFolder, setNewFolder] = useState("");
    const [update, setUpdate] = useState(0);
    const [showSaveOption, setShowSaveOptions] = useState(false);
    const [recipeID, setRecipeID] = useState("");

    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem("user"))
        var saved = thisUser.saved
        async function getSavedFolders() {
            var f = await getFolders(thisUser.username)
            setFolders(f)
            // var fNames = [];
            f.forEach((folder, index) => {
                if (currFolder.name == "" && folder.name == "none") {
                    setCurrFolder(folder);
                    setNoneIndex(index);
                }
                else if (currFolder.name == folder.name) {
                    setCurrFolder(folder);
                }
            });
        }
        getSavedFolders();
    }, [update])

    return (
        <>
        <SaveRecipeDialog
            title = "Unsave or Choose New Folder"
            unsave = {async () => {
                await unsaveRecipe(JSON.parse(localStorage.getItem("user")).username, recipeID);
                setUpdate(update + 1);
                setShowSaveOptions(false);
            }}
            onSubmit = {async (folderName) => {
                await unsaveRecipe(JSON.parse(localStorage.getItem("user")).username, recipeID);
                var data = await saveRecipe(JSON.parse(localStorage.getItem("user")).username, folderName, recipeID); 
                if (data) {
                    localStorage.setItem('user', JSON.stringify(data));
                }
                console.log("submit button clicked"); 
                setShowSaveOptions(false);
                setUpdate(update + 1);
            }}
            show = {showSaveOption}
            options = {folders.map(folder => folder.name)}
            onClose = {() => {console.log("hide save recipe"); setShowSaveOptions(false)}}
        />
        <Dialog open={showAddFolder} onClose={() => {setAddFolder(false)}}>
            <DialogTitle>Add Folder</DialogTitle>
            <DialogContent>
                <TextField
                    label="New Folder Name"
                    onChange={({ target }) => setNewFolder(target.value)} 
                />
                <Button 
                    type="submit" 
                    size="large"
                    variant="contained"
                    sx={{
                        mx: 3,
                        mt: 1,
                    }}
                    onClick={async () => {
                            var data = await addFolder(JSON.parse(localStorage.getItem("user")).username, newFolder);
                            if (data) {
                                localStorage.setItem('user', JSON.stringify(data));
                            }
                            setAddFolder(false);
                            setUpdate(update + 1);
                        }}
                >
                    Save
                </Button>
            </DialogContent>
        </Dialog>
        {!inFolder
        ?
            <Grid container spacing ={3}>
                {folders.map((folder, index) => {
                    if (folder.name != "none") {
                        return <Grid item key = {index}>
                            <Button variant = "outlined"
                                onClick = {() => {setInFolder(true); setCurrFolder(folder)}}>
                                {folder.name}
                            </Button>
                        </Grid>
                    }

                })}
                <Grid item key = {-1}>
                    <IconButton
                        onClick = {() => {setAddFolder(true)}}>
                        <Add></Add>
                    </IconButton>
                    </Grid>
            </Grid>
            :
            <Button variant = "outlined"
                onClick = {() => {setInFolder(false); setCurrFolder(folders[noneIndex])}}>
                Back
            </Button>
        }   
            <Grid container spacing ={3}>
            {currFolder.recipes.map((recipe, index) => (                
                <Grid item key={recipe._id}>
                    <RecipeCard 
                        recipe={recipe}
                        onSave={() => {
                            console.log("show save dialog"); 
                            setShowSaveOptions(true); 
                            setRecipeID(recipe._id); 
                        }}
                    />
                </Grid>
                ))}
            </Grid>
        </>
    )
}

async function addFolder(username, folder) {
    console.log({username, folder});
    const res = await fetch('/api/addSavedFolder', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            folder: folder,
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
            getData: true,
        })
    })
    const data = await res.json();
    console.log(data);
    return data;
}