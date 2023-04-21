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
import { getFolders, saveRecipe, unsaveRecipe } from '../pages/routes/savedRecipeRoutes';
import SaveRecipeHouseDialog from '../components/saveRecipeHouseDialog';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
import Masonry from '@mui/lab/Masonry';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';



export default function HomePage({ /*recipes*/ }) {
    const [displayRecipes, setDisplayRecipes] = useState([]);
    const [showSaveOption, setShowSaveOptions] = useState(false);
    const [recipeID, setRecipeID] = useState("");
    const [folders, setFolders] = useState([]);
    const [folderNames, setFolderNames] = useState([]);
    const [recipeIndex, setRecipeIndex] = useState(-1);
    const router = useRouter();
    const [recipeResults, setRecipeResults] = useState([]);
    const [showSaveHouse, setShowSaveHouse] = useState(false);
    const [page, setPage] = useState(1);
    const [pageChanged, setPageChanged] = useState(false);
    const [next, setNext] = useState(true);
    // const {enqueueSnackbar} = useSnackbar();

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

    // const showSuccess = (house) => {
    //     enqueueSnackbar('hi')
    // }
    // const showFail = (house) => {
    //     enqueueSnackbar(`Recipe already in ${house}`)
    // }

    async function getSavedFolders(recipes) {
        var f = await getFolders(JSON.parse(localStorage.getItem("user")).username)
        setFolders(f)
        var fNames = [];
        f.forEach(folder => {
            fNames.push(folder.name);
        });
        setFolderNames(fNames);
        recipes.forEach(recipe => {
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

    //api call to get results of search when requested
    async function fetchdata(searchTerm, filters, page) {
        const [ recipes, hasNext ] = await SearchRecipe(searchTerm, filters, JSON.parse(localStorage.getItem("user")).username, page, router.query.byFridge);
        setNext(hasNext)
        if (recipes.length === 0) {
            handleClickOpen();
            // setDisplayRecipes([]);
            await getSavedFolders([]);
        }
        else {
            console.log("matches: " + recipes[0].matches)
            // setDisplayRecipes(recipes);
            await getSavedFolders(recipes);
        }
        // await getSavedFolders();
    }

    useEffect(() => {
        setPageChanged(!pageChanged);
        setPage(1);
      }, [router.query.searchTerm, router.query.filters, router.query.byFridge]);

    useEffect(() => {
        debugger;
        //if the user searches something, update display with those recipes
        //else, display default recipes.
        if (router.isReady) {
            const searchTerm = router.query.searchTerm;
            const filters = router.query.filters;
            if (searchTerm) {
                // setTimeout(() => {
                fetchdata(searchTerm, filters, page);

            }
            else {
                async function getDefaultRecipes() {

                    const defaultRecipes = await getDefault(JSON.parse(localStorage.getItem("user")).username, page);
                    console.log("default recipes" + router.query.searchTerm)
                    await getSavedFolders(defaultRecipes);
                }
                getDefaultRecipes();
           }
        }
    }, [page, pageChanged, router.isReady]);

    return (
        <>
            <SnackbarProvider maxSnack={3}/>
            <SaveRecipeHouseDialog 
                show={showSaveHouse}
                onClose={() => {setShowSaveHouse(false)}}
                onSubmit = {async (house) => {
                    console.log(house);
                    debugger;
                    setShowSaveHouse(false);
                    house.forEach(async (h) => {
                        var data = await saveRecipe(h, "none", recipeID, true);
                        console.log(data);
                        if (data) {
                            enqueueSnackbar(`Recipe saved to ${h}`, {variant: "success"})
                        }
                        else {
                            enqueueSnackbar(`Recipe already in ${h}`, { variant: 'error' })
                        }
                    })
                    
                }}
            />
            <SaveRecipeDialog
                onSubmit={async (folderName) => {
                    var data = await saveRecipe(JSON.parse(localStorage.getItem("user")).username, folderName, recipeID, false);
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
                                onSaveHouse={() => {
                                    debugger;
                                    setShowSaveHouse(true);
                                    setRecipeID(recipe._id);
                                    setRecipeIndex(index);
                                }}
                            />
                    ))}
                </Masonry>
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
                        <DialogContentText data-test='FailedSearch'>
                            No recipes that match your search term and/or dietary filters were found. Please try a different keyword or filter.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button data-test='OkFailedSearch' onClick={handleClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}

async function SearchRecipe(search, filters, username, page, byFridge) {
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
                byFridge: byFridge,
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