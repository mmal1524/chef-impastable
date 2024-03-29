import * as React from 'react';
import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import clientPromise from '../lib/mongodb_client';
import Grid from '@mui/material/Grid';
import { ObjectId } from 'mongodb';
import Navbar from './navbar.js'
import { CardMedia } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
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
import { Favorite, FavoriteBorderOutlined, HouseOutlined } from '@mui/icons-material';
import { saveRecipe, unsaveRecipe } from './routes/savedRecipeRoutes';
import SaveRecipeDialog from '../components/saveRecipeDialog';
import AddToListDialog from '../components/add-ingredient-from-recipe';
import PostAddIcon from '@mui/icons-material/PostAdd';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import SaveRecipeHouseDialog from '../components/saveRecipeHouseDialog';
import { withStyles } from "@material-ui/core/styles";

export default function Recipe({ recipe, reviews }) {
    const router = useRouter();
    const [saved, setSaved] = useState(recipe.saved);
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [showSaveHouse, setShowSaveHouse] = useState(false);

    const theme = createTheme({
        palette: {
            primary: {
                main: "#ffc107",
            },
        },
    });

    const GoldTextTypography = withStyles({
        root: {
          color: "#ff9800",
          //textShadow: "1px 1px 1px #000"
          //textShadow: "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
          textShadow: "0 0 2px #000, 0 0 2px #000, 0 0 2px #000, 0 0 2px #000"
          
        }
    })(Typography);

    const YellowTextTypography = withStyles({
        root: {
          color: "#988558",
          textShadow: "1px 1px 1px #000"
          //textShadow: "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000",
        }
    })(Typography);

    var recipe1 = recipe;

    const [username, setUsername] = useState("");
    var [mealPlans, setMealPlans] = useState([]);

    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getUsername: {
                get() {
                    return this.username
                },
            },
            getMealPlans: {
                get() {
                    return this.mealPlans
                },
            }
        });
        setUsername(thisUser.getUsername)
        setMealPlans(thisUser.getMealPlans);
    }, []);

    function createRow(name, value) {
        return { name, value };
    }

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    var [open, setOpen] = useState(false);
    var [description, setDescription] = useState("");
    var [rating, setRating] = useState(0);

    var [firstStar, setFirstStar] = useState(false);
    var [secondStar, setSecondStar] = useState(false);
    var [thirdStar, setThirdStar] = useState(false);
    var [fourthStar, setFourthStar] = useState(false);
    var [fifthStar, setFifthStar] = useState(false);

    const [mealPlanOpen, setMealPlanOpen] = React.useState(false);  // dialog for choosing a meal plan
    var [chosenMealPlan, setChosenMealPlan] = React.useState("");   // which meal plan was clicked

    const [newMealPlanOpen, setNewMealPlanOpen] = React.useState(false); // dialog for creating new meal plan
    var [newMealPlanName, setNewMealPlanName] = React.useState(""); // text field for new meal plan name

    const [dayOpen, setDayOpen] = React.useState(false);    // dialog for choosing day of week of meal plan

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
        localStorage.setItem('user', JSON.stringify(userUpdated));
        // reloading page
        router.reload();
    }

    const handleMealPlanOpen = () => {
        setMealPlanOpen(true);
    };

    const handleMealPlanClose = () => {
        setMealPlanOpen(false);
    };

    const handleNewMealPlanOpen = () => {
        setNewMealPlanOpen(true);
    };

    const handleNewMealPlanClose = () => {
        setNewMealPlanOpen(false);
    }

    const handleNewMealPlanName = e => {
        setNewMealPlanName(e.target.value);
    }

    const handleChooseMealPlan = (value) => {
        setChosenMealPlan(value);
        setDayOpen(true);
    }

    const handleDayClose = () => {
        setDayOpen(false);
    };

    async function createReview(recipeID, author, rating, description) {
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
            <SaveRecipeHouseDialog 
                show={showSaveHouse}
                onClose={() => {setShowSaveHouse(false)}}
                onSubmit = {async (house) => {
                    console.log(house);

                    setShowSaveHouse(false);
                    house.forEach(async (h) => {
                        var data = await saveRecipe(h, "none", recipe._id, true);
                    })
                    
                }}
            />
            <SaveRecipeDialog
                onSubmit = {async (folderName) => {
                    var data = await saveRecipe(JSON.parse(localStorage.getItem("user")).username, folderName, recipe._id, false); 
                    if (data) {
                        localStorage.setItem('user', JSON.stringify(data));
                    }
                    setShowSaveDialog(false);
                    setSaved(true);
                }}
                show = {showSaveDialog}
                onClose = {() => {setShowSaveDialog(false)}}
            />

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
                                    <Fab data-test={`tag-${index}`} variant="extended" size="medium" color={(stateRecipeTags[index].exists) ? "primary" : ""} aria-label="add" onClick={async () => handleClick(index)} theme={theme} key={index + updateCount}>
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
                        <GoldTextTypography variant="h3" data-test="RecipeTitle">{recipe.title}</GoldTextTypography>
                    </Grid>
                    <Grid item
                        sx={{
                            pt:2,
                        }}
                    >
                        <Button 
                            data-test='AddFromRButton'
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
                        <img data-test="RecipeViewImage" src={recipe.image} alt="image of {recipe.title}" width={300} />
                    </CardMedia>
                </Grid>
                <Grid container justifyContent="center">
                    <IconButton
                        data-test="SaveRecipe"
                        onClick={() => {
                            if (saved) {
                                unsaveRecipe(JSON.parse(localStorage.getItem('user')).username, recipe._id, false);
                                setSaved(false);
                            }
                            else {
                                setShowSaveDialog(true);
                            }
                        }}
                    >
                        {saved 
                        ? 
                            <Favorite/>
                        : <FavoriteBorderOutlined />}
                    </IconButton>

                    {/* Add to meal plan button */}
                    <IconButton data-test="MealPlanButton"
                        onClick={handleMealPlanOpen}
                    >
                        <PostAddIcon />
                    </IconButton>

                    <IconButton
                        onClick={() => {setShowSaveHouse(true)}}
                    >
                        <HouseOutlined/>
                    </IconButton>

                    {/* Choose meal plan dialog */}
                    <Dialog data-test="ChooseMealPlanDialog"
                        open={mealPlanOpen}
                        onClose={handleMealPlanClose}
                    >
                        <Box sx={{backgroundColor: "orange"}}>
                            <DialogTitle data-test="ChooseMealPlan" textAlign={"center"}>Choose Meal Plan</DialogTitle>
                        </Box>
                        <List sx={{ pt: 0 }} data-test="MealPlans">
                            {/* Displaying meal plans */}
                            {mealPlans && mealPlans.map((mealPlan, x) => (
                                <ListItem disableGutters>
                                    <ListItemButton data-test={`MealPlan-${x}`} onClick={() => handleChooseMealPlan(mealPlan)} key={mealPlan}>
                                        <ListItemText data-test={`MealPlanText-${x}`} primary={mealPlan} sx={{textAlign: "center"}}/>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            { /* Create new meal plan button */ }
                            <ListItem disableGutters>
                                <ListItemButton data-test="CreateButton"
                                    autoFocus
                                    onClick={handleNewMealPlanOpen}
                                >
                                    <ListItemAvatar data-test="Avatar">
                                        <Avatar sx={{backgroundColor: "orange"}}>
                                            <AddIcon sx={{color: "black"}}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText data-test="CreateText" primary="Create New Meal Plan" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Dialog>

                    {/* Create new meal plan dialog */}
                    <Dialog data-test="CreateDialog"
                        open={newMealPlanOpen}
                        onClose={handleNewMealPlanClose}
                    >
                        <DialogTitle data-test="CreateText">Create New Meal Plan</DialogTitle>
                        <DialogContent>
                            <Box sx={{width: 300}}>
                                <TextField data-test="NewMealPlanTextField"
                                    required
                                    id="standard-required"
                                    label="Name of Meal Plan"
                                    variant="standard"
                                    fullWidth
                                    value={newMealPlanName}
                                    onChange={handleNewMealPlanName}
                                />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button data-test="Cancel" sx={{color: "gray"}} onClick={handleNewMealPlanClose}>Cancel</Button>
                            <Button data-test="Create"
                                sx = {{color: "black"}} 
                                onClick={async () => {
                                    var data = await createMealPlan(username, newMealPlanName);
                                    var user = await addMealPlanToUser(username, data.name)
                                    setMealPlans(user.mealPlans);
                                    setNewMealPlanOpen(false);
                                    setNewMealPlanName("");
                                    localStorage.setItem('user', JSON.stringify(user))
                                }}
                            >Create</Button>
                        </DialogActions>
                    </Dialog>
                    
                    {/* Choose day of week dialog */}
                    <Dialog data-test="ChooseDayDialog"
                        open={dayOpen}
                        onClose={handleDayClose}
                    >
                        <Box sx={{width: 300}}>
                            <Box sx={{backgroundColor: "orange"}}>
                                <DialogTitle data-test='MealPlan'>{chosenMealPlan}</DialogTitle>
                            </Box>
                            <DialogTitle data-test="Recipe">Add {recipe.title} to: </DialogTitle>
                            <List data-test="Days">
                                {daysOfWeek.map((day, x) => (
                                    <ListItem disableGutters>
                                        <ListItemButton data-test={`Day-${x}`} onClick={async () => {
                                            var mealPlan = await addRecipeToMealPlan(username, chosenMealPlan, day, recipe._id);
                                            setDayOpen(false);
                                            setMealPlanOpen(false);
                                            setChosenMealPlan("");
                                            setDayOpen("");
                                        }}>
                                            <ListItemText primary={day} sx={{textAlign: "center"}}/>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Dialog>
                </Grid>

                <Grid container
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <p>Prep time: {recipe.prep_time} minutes, Cook time: {recipe.cook_time} minutes, Total time: {recipe.total_time} minutes, Yields: {recipe.yields} </p>
                </Grid>
                <div style={{marginLeft: '20px', marginRight: '20px'}}>
                    <YellowTextTypography variant="h4" style={{marginBottom: '10px'}}> 
                        Description:
                    </YellowTextTypography>
                    {recipe.description}
                    <YellowTextTypography variant="h4" style={{marginTop: '20px'}}>
                        Instructions:
                    </YellowTextTypography>
                    {recipe.instructions_list.map((instruction) => (
                        <ul>
                            <li>{instruction}</li>
                        </ul>
                    ))}
                    <YellowTextTypography variant="h4">
                        Ingredients:
                    </YellowTextTypography>
                    {recipe.ingredients.map(ingredient => (
                          <ul>
                          {ingredient.ingredient && !/^\s*$/.test(ingredient.ingredient) && ingredient.ingredient !== "" && (
                            <li>
                              {ingredient.ingredient}
                              {typeof ingredient.quantity !== "undefined" && ingredient.quantity !== "" && !/^\s*$/.test(ingredient.quantity) ? `, quantity: ${ingredient.quantity}` : null}
                              {typeof ingredient.measurement !== "undefined" && ingredient.measurement !== "" && !/^\s*$/.test(ingredient.measurement) ? ` ${ingredient.measurement}` : null}
                            </li>
                          )}
                        </ul>
                    ))}
                    <YellowTextTypography variant="h4" style={{marginBottom: '10px'}}>
                        Nutrition Facts:
                    </YellowTextTypography>

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
                    data-test="LeaveAReview"
                    sx={{margin: 4, backgroundColor:"orange", color:"black"}} 
                    variant="contained"
                    startIcon={<RateReviewIcon />}
                    onClick={handleClickOpen}
                >
                    Leave a Review
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Leave a Review</DialogTitle>
                    <DialogContent data-test="ReviewUI">
                        <DialogContentText>Rating</DialogContentText>
                        <Stack
                            data-test="Stars"
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <IconButton data-test="Star1" size="large" onClick={handleFirstClick}>
                                {firstStar ? 
                                    <StarIcon sx={{width: 50, height: 50}}/> 
                                    : <StarOutlineIcon sx={{width: 50, height: 50}}/>}
                            </IconButton>
                            <IconButton data-test="Star2" size="large" onClick={handleSecondClick}>
                                {secondStar ? 
                                    <StarIcon sx={{width: 50, height: 50}}/> 
                                    : <StarOutlineIcon sx={{width: 50, height: 50}}/>}
                            </IconButton>
                            <IconButton data-test="Star3" size="large" onClick={handleThirdClick}>
                                {thirdStar ? 
                                    <StarIcon sx={{width: 50, height: 50}}/> 
                                    : <StarOutlineIcon sx={{width: 50, height: 50}}/>}
                            </IconButton>
                            <IconButton data-test="Star4" size="large" onClick={handleFourthClick}>
                                {fourthStar ? 
                                    <StarIcon sx={{width: 50, height: 50}}/> 
                                    : <StarOutlineIcon sx={{width: 50, height: 50}}/>}
                            </IconButton>
                            <IconButton data-test="Star5" size="large" onClick={handleFifthClick}>
                                {fifthStar ? 
                                    <StarIcon sx={{width: 50, height: 50}}/> 
                                    : <StarOutlineIcon sx={{width: 50, height: 50}}/>}
                            </IconButton>
                        </Stack>
                        <DialogContentText>Description/Comments</DialogContentText>
                        <TextField
                            data-test="description"
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
                        <Button data-test="Post" onClick={handlePost}>Post</Button>
                        <Button data-test="Discard" onClick={handleClose}>Discard</Button>
                    </DialogActions>
                </Dialog>
                <div style={{marginLeft: "20px", marginRight: "20px"}}>
                <h2 data-test="NumReviews" className='reviews'>{reviews.length} Reviews</h2>
                {averageRating(reviews)}
                </div>
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
                <div data-test="Reviews" number={reviews.length}>
                    {reviews.map((review, index) => (
                        reviewCard(review, index)
                    ))}
                </div>
            );
        }
    }

    function averageRating(reviews) {
        if (reviews.length == 0) {
            return (
                <>
                    <div data-test="AverageRating">Average Rating: N/A</div>
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
                    <div data-test="AverageRating">Average Rating: {average.toFixed(2)} stars</div>
                    <p></p>
                </>
            )
        }
    }

    async function createMealPlan(username, mealPlanName) {
        try {
            const res = await fetch('/api/createMealPlan', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: mealPlanName,
                    user: username
                })
            })
            const data = await res.json();
            return data;
        }
        catch (error) {
            return error;
        }
    }

    async function addMealPlanToUser(username, mealPlanName) {
        try {
            const res = await fetch('/api/addMealPlanToUser', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: mealPlanName,
                    user: username
                })
            })
            const data = await res.json();
            return data;
        }
        catch (error) {
            return error;
        }
    }

    async function addRecipeToMealPlan(username, mealPlan, day, recipeID) {
        try {
            const res = await fetch('/api/addRecipeToMealPlan', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    mealPlan: mealPlan,
                    day: day,
                    recipeID: recipeID
                })
            })
            const data = await res.json();
            return data;
        }
        catch (error) {
            return error;
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
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const recipe = await db
            .collection("recipes")
            .findOne(new ObjectId(`${context.query.id}`));

        const folder = await db
            .collection("savedfolders")
            .findOne({user: context.query.username, recipes: new ObjectId(`${context.query.id}`)});

        if (folder) {
            recipe.saved = true;
        } else {
            recipe.saved = false;
        }
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