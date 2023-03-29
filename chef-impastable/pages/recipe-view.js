import * as React from 'react';
import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import clientPromise from '../lib/mongodb_client';
import Grid from '@mui/material/Grid';
import { ObjectId } from 'mongodb';
import Navbar from './navbar.js'
import { Button, CardMedia } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import RateReviewIcon from '@mui/icons-material/RateReview';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Stack } from '@mui/system';
import { reviewCard } from '../components/review-card';
import { useRouter } from "next/router";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { createTheme } from '@mui/material/styles';
import AddToListDialog from '../components/add-ingredient-from-recipe';

export default function Recipe({ recipe, reviews }) {
    const router = useRouter();

    const theme = createTheme({
        palette: {
            primary: {
                main: "#ffc107",
            },
        },
    });

    var recipe1 = recipe;

    const [username, setUsername] = useState("");
    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getUsername: {
                get() {
                    return this.username
                },
            },
        });
        setUsername(thisUser.getUsername);
    }, []);

    function createRow(name, value) {
        return { name, value };
    }
    console.log(JSON.stringify(recipe.nutrients.calories));

    var [open, setOpen] = useState(false);
    var [description, setDescription] = useState("");
    var [rating, setRating] = useState(0);

    var [firstStar, setFirstStar] = useState(false);
    var [secondStar, setSecondStar] = useState(false);
    var [thirdStar, setThirdStar] = useState(false);
    var [fourthStar, setFourthStar] = useState(false);
    var [fifthStar, setFifthStar] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDescription("");
        setRating(0);
    };

    const handleChangeDescription = e => {
        setDescription(e.target.value);
    };

    const handleFirstClick = () => {
        if (firstStar && !secondStar) {
            setFirstStar(false);
            setSecondStar(false);
            setThirdStar(false);
            setFourthStar(false);
            setFifthStar(false);
            setRating(0);
        }
        else {
            setFirstStar(true);
            setSecondStar(false);
            setThirdStar(false);
            setFourthStar(false);
            setFifthStar(false);
            setRating(1);
        }
    };

    const handleSecondClick = () => {
        setFirstStar(true);
        setSecondStar(true);
        setThirdStar(false);
        setFourthStar(false);
        setFifthStar(false);
        setRating(2);
    };

    const handleThirdClick = () => {
        setFirstStar(true);
        setSecondStar(true);
        setThirdStar(true);
        setFourthStar(false);
        setFifthStar(false);
        setRating(3);
    };

    const handleFourthClick = () => {
        setFirstStar(true);
        setSecondStar(true);
        setThirdStar(true);
        setFourthStar(true);
        setFifthStar(false);
        setRating(4);
    };

    const handleFifthClick = () => {
        setFirstStar(true);
        setSecondStar(true);
        setThirdStar(true);
        setFourthStar(true);
        setFifthStar(true);
        setRating(5);
    };

    const handlePost = async () => {
        // creating a review object
        var reviewid = await createReview(recipe1._id, username, rating, description);

        // adding review ID to recipe reviews
        var recipeUpdated = await addReviewToRecipe(recipe1._id, reviewid.reviewID);
        // adding review ID to user's reviewed recipes
        var userUpdated = await addReviewToUser(username, reviewid.reviewID);
        console.log(userUpdated);
        localStorage.setItem('user', JSON.stringify(userUpdated));
        // reloading page
        router.reload();
    }

    async function createReview(recipeID, author, rating, description) {
        console.log(recipeID);
        console.log(author);
        console.log(rating);
        console.log(description);
        const res = await fetch('api/createReview', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipeID: recipeID,
                author: author,
                rating: rating,
                description: description
            })
        });
        const data = await res.json();
        console.log(data);
        return data;
    }

    async function addReviewToRecipe(recipeID, reviewID) {
        const res = await fetch('api/addReviewToRecipe', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipeID: recipeID,
                reviewID: reviewID
            })
        });
        const data = await res.json();
        return data;
    }

    async function addReviewToUser(username, reviewID) {
        console.log(username);
        console.log(reviewID);
        const res = await fetch('api/addReviewToUser', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                reviewID: reviewID
            })
        });
        const data = await res.json();
        return data;
    }

    const nutritionRows = [
        createRow('Calories', recipe.nutrients.calories),
        createRow('Carbohydrate Content', recipe.nutrients.carbohydrateContent),
        createRow('Cholesterol Content', recipe.nutrients.cholesterolContent),
        createRow('Fiber Content', recipe.nutrients.fiberContent),
        createRow('Protein Content', recipe.nutrients.proteinContent),
        createRow('Saturated Fat Content', recipe.nutrients.saturatedFatContent),
        createRow('Sodium Content', recipe.nutrients.sodiumContent),
        createRow('Fat Content', recipe.nutrients.fatContent),
        createRow('Unsaturated Fat Content', recipe.nutrients.unsaturatedFatContent),
    ];

    const [stateRecipeTags, setStateRecipeTags] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            var data = await AddTag(recipe.title, null, null, null, false);
            setStateRecipeTags(data.tags);
        };
        if (recipe.tags === undefined) {
            //if the recipe tags are undefined, must be initialized 
            fetchData();
        } else {
            setStateRecipeTags(recipe.tags)
        }
    }, [])

    const [updateCount, setUpdateCount] = useState(0);
    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleClick = async (index) => {
        const updatedTag = {
            ...stateRecipeTags[index],
            exists: !stateRecipeTags[index].exists,
        };
        const updatedTags = [
            ...stateRecipeTags.slice(0, index),
            updatedTag,
            ...stateRecipeTags.slice(index + 1),
        ];
        setStateRecipeTags(updatedTags);
        await AddTag(recipe.title, updatedTag.tag, updatedTag.exists, true);
    };

    const [addSLDialog, setAddSLDialog] = useState(false);
    const handleOpenAddToShoppingList = () => {
        setAddSLDialog(true);
    } 
    

    return (
        <>
            <Grid>
                <div className="App">
                    <Navbar />
                </div>
                <div>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>Dietary Tags</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                {stateRecipeTags && stateRecipeTags.map((tag, index) => (
                                    <Fab variant="extended" size="medium" color={(stateRecipeTags[index].exists) ? "primary" : ""} aria-label="add" onClick={async () => handleClick(index)} theme={theme} key={index + updateCount}>
                                        {tag.tag}
                                    </Fab>
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <Grid container
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    <Grid item
                        sx={{width: 200}}
                    ></Grid>
                    <Grid item
                        //display="flex"
                        //justifyContent="center"
                        //alignItems="center"
                    >
                        <h1>{recipe.title}</h1>
                    </Grid>
                    <Grid item
                        sx={{
                            pt:2,
                        }}
                    >
                        <Button 
                            sx={{
                                width: 200
                            }}
                            onClick={ async() => {
                                console.log(recipe);
                                console.log(recipe.ingredients)
                                handleOpenAddToShoppingList();
                            }}
                        >
                            Add to Shopping List
                        </Button>
                        {addSLDialog && (<AddToListDialog
                            recipe={recipe}
                            open={addSLDialog}
                            onClose = {() => {setAddSLDialog(false)}}
                        />)}
                    </Grid>
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
                <div>
                    <h2>
                        Instructions
                    </h2>
                    {recipe.instructions_list.map((instruction) => (
                        <ul>
                            <li>{instruction}</li>
                        </ul>
                    ))}
                    <h2>
                        Ingredients
                    </h2>
                    {recipe.ingredients.map(ingredient => (
                        <ul>
                            <li>{ingredient.ingredient}, quantity: {ingredient.quantity}, measurement: {ingredient.measurement}</li>
                        </ul>
                    ))}
                    <h2>
                        Nutrition Facts
                    </h2>

                    <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
                        <Table sx={{ maxWidth: 800 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nutrients</TableCell>
                                    <TableCell align="middle">Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {nutritionRows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="middle">{row.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Button
                    sx={{margin: 4, backgroundColor:"orange", color:"black"}} 
                    variant="contained"
                    startIcon={<RateReviewIcon />}
                    onClick={handleClickOpen}
                >
                    Leave a Review
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Leave a Review</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Rating</DialogContentText>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <IconButton size="large" onClick={handleFirstClick}>
                                {firstStar ? 
                                    <StarIcon sx={{width: 50, height: 50}}/> 
                                    : <StarOutlineIcon sx={{width: 50, height: 50}}/>}
                            </IconButton>
                            <IconButton size="large" onClick={handleSecondClick}>
                                {secondStar ? 
                                    <StarIcon sx={{width: 50, height: 50}}/> 
                                    : <StarOutlineIcon sx={{width: 50, height: 50}}/>}
                            </IconButton>
                            <IconButton size="large" onClick={handleThirdClick}>
                                {thirdStar ? 
                                    <StarIcon sx={{width: 50, height: 50}}/> 
                                    : <StarOutlineIcon sx={{width: 50, height: 50}}/>}
                            </IconButton>
                            <IconButton size="large" onClick={handleFourthClick}>
                                {fourthStar ? 
                                    <StarIcon sx={{width: 50, height: 50}}/> 
                                    : <StarOutlineIcon sx={{width: 50, height: 50}}/>}
                            </IconButton>
                            <IconButton size="large" onClick={handleFifthClick}>
                                {fifthStar ? 
                                    <StarIcon sx={{width: 50, height: 50}}/> 
                                    : <StarOutlineIcon sx={{width: 50, height: 50}}/>}
                            </IconButton>
                        </Stack>
                        <DialogContentText>Description/Comments</DialogContentText>
                        <TextField
                            id="description"
                            multiline
                            rows={10}
                            defaultValue=""
                            sx={{width: '100%'}}
                            value={description}
                            onChange={handleChangeDescription}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handlePost}>Post</Button>
                        <Button onClick={handleClose}>Discard</Button>
                    </DialogActions>
                </Dialog>
                <h2 className='reviews'>{reviews.length} Reviews</h2>
                {averageRating(reviews)}
                {displayReviews(reviews)}
            </Grid>

            <style jsx>{`
                .reviews {
                    margin: 0px;
                }
            `}</style>
        </>
    );

    function displayReviews(reviews) {
        if (!reviews || reviews.length == 0) {
            return(<>No reviews, create one now!</>);
        } else {
            return(
                reviews.map((review) => (
                    reviewCard(review)
                ))
            );
        }
    }

    function averageRating(reviews) {
        if (reviews.length == 0) {
            return (
                <>
                    <div>Average Rating: N/A</div>
                    <p></p>
                </>
            );
        } else {
            var i = 0;
            var total = 0;
            for (i; i < reviews.length; i++) {
                total += reviews[i].rating;
            }
            var average = total/reviews.length;
            return (
                <>
                    <div>Average Rating: {average.toFixed(2)} stars</div>
                    <p></p>
                </>
            )
        }
    }
}

async function AddTag(title, tag, exists, isDefined) {
    try {
        const res = await fetch('/api/recipeAddTags', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                tag: tag,
                exists: exists,
                isDefined: isDefined
            })
        })
        const data = await res.json();
        return data;
    }
    catch (error) {
        return error;
    }
}

export async function getServerSideProps(context) {
    console.log("query: " + context.query)
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const recipe = await db
            .collection("recipes")
            .findOne(new ObjectId(`${context.query.id}`));

        var reviews = recipe.reviews;
        var reviewObjects;
        if (!reviews) {
            reviewObjects = [];
        }
        else {
            reviewObjects = new Array(reviews.length);
            var i = 0;
            for (i; i < reviews.length; i++) {
                var r = await db
                    .collection("reviews")
                    .find({_id: reviews[i]}).toArray();
                reviewObjects[i] = JSON.parse(JSON.stringify(r[0]));
            }
        }

        return {
            props: { recipe: JSON.parse(JSON.stringify(recipe)), reviews: reviewObjects },
        };
    }
    catch (e) {
        console.error(e);
    }
}


