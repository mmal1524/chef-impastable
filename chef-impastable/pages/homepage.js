import Link from 'next/link';
import RecipeCard from '../components/recipe-card';
import Grid from '@mui/material/Grid';
import { ImageList, ImageListItem, Dialog, Button } from '@mui/material'
// import clientPromise from "../lib/mongodb_client";
import Navbar from './navbar';
import { useEffect, useState } from 'react';
import React from 'react';
import SaveRecipeDialog from '../components/saveRecipeDialog';
import { useRouter } from "next/router";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
import Masonry from '@mui/lab/Masonry';


export default function HomePage({ /*recipes*/ }) {
    const [displayRecipes, setDisplayRecipes] = useState([]);
    const [showSaveOption, setShowSaveOptions] = useState(false);
    const [recipeID, setRecipeID] = useState("");
    const [folders, setFolders] = useState([]);
    const [folderNames, setFolderNames] = useState([]);
    const [recipeIndex, setRecipeIndex] = useState(-1);
    const router = useRouter();
    const [recipeResults, setRecipeResults] = useState([]);
    const [page, setPage] = useState(1);
    const [pageChanged, setPageChanged] = useState(false);
    const [next, setNext] = useState(true);

    //dialog handlers for when there are no results from a search
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //api call to get results of search when requested
    async function fetchdata(searchTerm, filters, page) {
        debugger;
        const [ recipes, hasNext ] = await SearchRecipe(searchTerm, filters, JSON.parse(localStorage.getItem("user")).username, page);
        setNext(hasNext)
        if (recipes.length === 0) {
            handleClickOpen();
            setDisplayRecipes([]);
        }
        else {
            setDisplayRecipes(recipes);
        }
    }

    useEffect(() => {
        debugger;
        setPageChanged(!pageChanged);
        setPage(1);
      }, [router.query.searchTerm, router.query.filters]);

      useEffect(() => {
        debugger;
        //if the user searches something, update display with those recipes
        //else, display default recipes.
        const searchTerm = router.query.searchTerm;
        const filters = router.query.filters;
        if (searchTerm) {
            setTimeout(() => {
                fetchdata(searchTerm, filters, page);
            }, 200);
        }
        else {
            async function getDefaultRecipes() {
                const defaultRecipes = await getDefault(JSON.parse(localStorage.getItem("user")).username, page);
                // if (defaultRecipes.status != null) {
                //     setRecipeResults(recipes)
                //     return;
                // }
                setRecipeResults(defaultRecipes);
                setDisplayRecipes(defaultRecipes);
            
                var thisUser = JSON.parse(localStorage.getItem("user"))
                async function getSavedFolders() {
                    var f = await getFolders(thisUser.username)
                    setFolders(f)
                    var fNames = [];
                    f.forEach(folder => {
                        fNames.push(folder.name);
                    });
                    setFolderNames(fNames);
                    // console.log(displayRecipes);
                    defaultRecipes.forEach(recipe => {
                        // console.log(recipe)
                        recipe.saved = false;

                        f.forEach(sf => {
                            if (sf.recipes.includes(recipe._id)) {
                                recipe.saved = true
                            }
                        });
                    });
                    // console.log(recipes);
                    
                }
                getSavedFolders();
            }
            getDefaultRecipes();
        }
      }, [page, pageChanged]);

    // useEffect(() => {
    //     // debugger;
    //     //console.log(recipes)
    //     var thisUser = JSON.parse(localStorage.getItem("user"))
    //     var saved = thisUser.saved
    //     async function getSavedFolders() {
    //         var f = await getFolders(thisUser.username)
    //         setFolders(f)
    //         var fNames = [];
    //         f.forEach(folder => {
    //             fNames.push(folder.name);
    //         });
    //         setFolderNames(fNames);
    //         displayRecipes.forEach(recipe => {
    //             // console.log(recipe)
    //             recipe.saved = false;

    //             f.forEach(sf => {
    //                 if (sf.recipes.includes(recipe._id)) {
    //                     recipe.saved = true
    //                 }
    //             });
    //         });
    //         // console.log(recipes);
    //         setDisplayRecipes(recipes);
    //     }
    //     getSavedFolders();
    // }, [])
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
                <Grid container spacing = {3}>
                    {page != 1 ?
                        <Grid item key={"back"}>
                            <Button onClick={() => {setPage(page - 1)}}>
                                Previous Page
                            </Button>
                        </Grid>
                        : <></>
                    }
                    {next ? 
                    <Grid item key={"next"}>
                        <Button onClick={() => {setPage(page + 1)}}>
                            Next Page
                        </Button>
                    </Grid>
                    : <></>
                    }
                </Grid>
                <Masonry>
                    { displayRecipes && displayRecipes.map((recipe, index) => (
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
                    ))}
                </Masonry>
                <Grid container spacing={3}>
                    {/* display recipes */}
                    { displayRecipes && displayRecipes.map((recipe, index) => (
                        <Grid item key={recipe._id}>
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
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"No Results Found"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            No recipes that match your search and/or dietary filters were found. Please try a different keyword or filter.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
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


// export async function getServerSideProps() {
//     try {
//         // const client = await clientPromise;
//         // const db = client.db("test");
//         // var recipes = await db.collection('recipes')
//         //     .aggregate(
//         //     [
//         //     {
//         //         $addFields: {
//         //             matches: { 
//         //                 $size: {
//         //                     $filter: {
//         //                         input: "$ingredients",
//         //                         as: "ingredient",
//         //                         cond: { $in: ["$$ingredient.ingredient", user.fridge]}
//         //                     }
//         //                 }
//         //             }
//         //         }
//         //     },
//         //     {
//         //         $sort: {matches: -1}
//         //     }
//         // ])
//         // .limit(20);
//         // const recipes = await db
//         //     .collection("recipes")
//         //     .find({
//         //         // $where: function() {
//         //         //         return test == "hello";
//         //         //     },
//         //         }
//         //     )
//         //     .limit(20)
//         //     .toArray();
//         return {
//             props: { recipes: JSON.parse(JSON.stringify(recipes)) },
//         };
//     }
//     catch (e) {
//         console.error(e);
//     }
// }
async function SearchRecipe(search, filters, username, page) {
    try {
        const res = await fetch('/api/searchRecipe', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                search: search,
                filters: filters,
                username: username,
                byFridge: false,
                page: page
            })
        })
        const data = await res.json();
        return data;
    } catch {
        console.log("error");
    }
}
async function getDefault(username, page) {
    
    try {
        const res = await fetch('/api/getRecipesByFridge', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                page: page
            })
        })
        const data = await res.json();
        return data;
    } catch {
        return error
    }
}