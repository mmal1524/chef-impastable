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
import { getFolders, saveRecipe, unsaveRecipe } from '../pages/routes/savedRecipeRoutes';
import SaveRecipeHouseDialog from './saveRecipeHouseDialog';

export default function SavedRecipes(props) {
    const [folders, setFolders] = useState([]);
    const [currFolder, setCurrFolder] = useState({name: "", recipes: []});

    const [inFolder, setInFolder] = useState(false);
    const [noneIndex, setNoneIndex] = useState(-1);
    const [showAddFolder, setAddFolder] = useState(false);
    const [newFolder, setNewFolder] = useState("");
    const [update, setUpdate] = useState(0);
    const [showSaveOption, setShowSaveOptions] = useState(false);
    const [recipeID, setRecipeID] = useState("");
    const [showSaveHouse, setShowSaveHouse] = useState(false);

    const username = props.user ? props.user : JSON.parse(localStorage.getItem("user")).username;

    useEffect(() => {
        debugger;
        async function getSavedFolders() {
            var f;
            if (props.isHouse) {
                f = await getFolders(props.houseID, true, props.isHouse)
            }
            else {
                f = await getFolders(username, true, false)
            }
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
                await unsaveRecipe(username, recipeID, false);
                setUpdate(update + 1);
                setShowSaveOptions(false);
            }}
            onSubmit = {async (folderName) => {
                await unsaveRecipe(username, recipeID, false);
                var data = await saveRecipe(username, folderName, recipeID, false); 
                if (data) {
                    localStorage.setItem('user', JSON.stringify(data));
                }
                setShowSaveOptions(false);
                setUpdate(update + 1);
            }}
            show = {showSaveOption}
            options = {folders.map(folder => folder.name)}
            onClose = {() => {setShowSaveOptions(false)}}
        />
        <SaveRecipeHouseDialog 
                show={showSaveHouse}
                onClose={() => {setShowSaveHouse(false)}}
                onSubmit = {async (house) => {
                    console.log(house);

                    setShowSaveHouse(false);
                    house.forEach(async (h) => {
                        var data = await saveRecipe(h, "none", recipeID, true);
                    })
                    
                }}
            />
        <Dialog open={showAddFolder} onClose={() => {setAddFolder(false)}}>
            <DialogTitle>Add Folder</DialogTitle>
            <DialogContent>
                <TextField
                    data-test="AddFolderTextField"
                    label="New Folder Name"
                    onChange={({ target }) => setNewFolder(target.value)} 
                />
                <Button 
                    data-test="AddFolderSubmitButton"
                    disabled={newFolder.length == 0 || folders.map(f => f.name.toLowerCase()).includes(newFolder.toLowerCase())}
                    type="submit" 
                    size="large"
                    variant="contained"
                    sx={{
                        mx: 3,
                        mt: 1,
                    }}
                    onClick={async () => {
                            var data = await addFolder(username, newFolder);
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
            <Grid data-test="SavedRecipeFolderView" container spacing ={3}>
                {folders.map((folder, index) => {
                    if (folder.name != "none") {
                        return <Grid item key = {index}>
                            <Button 
                                data-test={`SavedRecipeFolder-${index}`}
                                variant = "outlined"
                                onClick = {() => {setInFolder(true); setCurrFolder(folder)}}>
                                {folder.name}
                            </Button>
                        </Grid>
                    }

                })}
                {props.user ? <></> :
                <Grid item key = {-1}>
                    <IconButton
                        data-test="AddSavedRecipeFolderButton"
                        onClick = {() => {setAddFolder(true)}}>
                        <Add></Add>
                    </IconButton>
                </Grid>
                }
            </Grid>
            :
            <Button variant = "outlined"
                data-test="ExitFolderButton"
                onClick = {() => {setInFolder(false); setCurrFolder(folders[noneIndex])}}>
                Back
            </Button>
        }   
            <Grid data-test="SavedRecipesView" container spacing ={3}>
            {currFolder.recipes.map((recipe, index) => (                
                <Grid item key={recipe._id}>
                    {props.user || props.houseID ? 
                        <RecipeCard 
                            index = {index}
                            recipe={recipe}
                            onSaveHouse={() => {
                                debugger;
                                setShowSaveHouse(true);
                                setRecipeID(recipe._id);
                            }}
                        /> 
                        
                    :
                        <RecipeCard 
                            index = {index}
                            recipe={recipe}
                            onSave={() => {
                                setShowSaveOptions(true); 
                                setRecipeID(recipe._id); 
                                
                            }}
                            onSaveHouse={() => {
                                debugger;
                                setShowSaveHouse(true);
                                setRecipeID(recipe._id);
                            }}
                        />
                    }
                </Grid>
                ))}
            </Grid>
        </>
    )
}

async function addFolder(username, folder) {
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
    return data;
}

// async function saveRecipe(username, folder, recipeID) {
//     const res = await fetch('/api/saveRecipe', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             username: username,
//             folder: folder,
//             recipeID: recipeID
//         })
//     })
//     const data = await res.json();
//     return data;
// }

// async function unsaveRecipe(username, recipeID) {
//     const res = await fetch('/api/unsaveRecipe', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             username: username,
//             recipeID: recipeID
//         })
//     })
//     const data = await res.json();
//     // console.log(data);
//     return data;
// }

// async function getFolders(user_id) {
//     const res = await fetch('/api/getSavedRecipes', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             user: user_id,
//             getData: true,
//         })
//     })
//     const data = await res.json();
//     return data;
// }