import Navbar from './navbar.js'
import * as React from 'react';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Dialog, Grid, IconButton, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Router from "next/router";
import { Autocomplete, Modal } from '@mui/material';
import clientPromise from '../lib/mongodb_client';
import { displayIngredient } from '../components/ingredient-card.js';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';


export default function CreateRecipe({ ingredientOptions }) {
    const ingredientArr = ingredientOptions.map(a => a.ingredient);
    const [ingredientArr2, setIngredientArr2] = useState(ingredientArr)
    const [addIngr, setAddIngr] = useState("");
    const [addQuantity, setAddQuantity] = useState("");
    const [addUnit, setAddUnit] = useState("");

    const [username, setUsername] = useState("");
    useEffect(() => {
        const thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getUsername: {
                get() {
                    return this.username
                }
            }
        });
        setUsername(thisUser.getUsername);
    }, [])

    const [cookTime, setcookTime] = useState("");
    const [description, setdescription] = useState("");
    const [image, setImage] = useState("");
    const [ingredientList, setIngredientList] = useState([]);
    const [finalIngredientList, setFinalIngredientList] = useState([]);
    const [instructions, setinstructions] = useState("");
    const [preptime, setpreptime] = useState("");
    const [title, settitle] = useState("");
    const [totalTime, setTotalTime] = useState("");
    const [yields, setYields] = useState("");
    const [calories, setCalories] = useState("");
    const [carbs, setCarbs] = useState("");
    const [cholesterol, setCholesterol] = useState("");
    const [fiber, setFiber] = useState("");
    const [protein, setProtein] = useState("");
    const [saturatedFat, setSaturatedFat] = useState("");
    const [sodium, setSodium] = useState("");
    const [fat, setFat] = useState("");
    const [unsaturatedFat, setUnsaturatedFat] = useState("");

    //popup if required fields are left blank
    const [open, setOpen] = React.useState(false);
    const [ingredientOpen, setIngredientOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const handleClickOpenDoesntExist = () => {
        setOpen4(true);
    };
    const handleCloseIngredientError = () => {
        setOpen4(false);
    };
    const handleClickOpenExists = () => {
        setOpen2(true);
    };
    const handleCloseIngredientExists = () => {
        setOpen2(false);
    };
    const handleClickOpenEmptyString = () => {
        setOpen3(true);
    };
    const handleCloseEmptyString = () => {
        setOpen3(false);
    };
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleIngredientClickOpen = () => {
        setIngredientOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleIngredientClose = () => {
        setIngredientOpen(false);
    }
    const handleCookTime = e => {
        setcookTime(e.target.value)
    }
    const handleDescription = e => {
        setdescription(e.target.value)
    }
    const handleImage = e => {
        setImage(e.target.value)
    }
    const handleQuantity = e => {
        setAddQuantity(e.target.value)
    }
    const handleUnits = e => {
        setAddUnit(e.target.value)
    }
    const handleInstructions = e => {
        setinstructions(e.target.value)
    }
    const handlePrepTime = e => {
        setpreptime(e.target.value)
    }
    const handleTitle = e => {
        settitle(e.target.value)
    }
    const handleTotalTime = e => {
        setTotalTime(e.target.value)
    }
    const handleYields = e => {
        setYields(e.target.value)
    }
    const handleCalories = e => {
        setCalories(e.target.value)
    }
    const handleCarbs = e => {
        setCarbs(e.target.value)
    }
    const handleCholesterol = e => {
        setCholesterol(e.target.value)
    }
    const handleFiber = e => {
        setFiber(e.target.value)
    }
    const handleProtein = e => {
        setProtein(e.target.value)
    }
    const handleSaturatedFat = e => {
        setSaturatedFat(e.target.value)
    }
    const handleSodium = e => {
        setSodium(e.target.value)
    }
    const handleFat = e => {
        setFat(e.target.value)
    }
    const handleUnsaturatedFat = e => {
        setUnsaturatedFat(e.target.value)
    }
    var addButton;
    return (
        <div>
            <div className="App">
                <Navbar />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1>Create a Recipe</h1>
            </div>
            <Container component="main" maxWidth="auto">
                <Box
                    sx={{
                        marginTop: 2,
                        //width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Grid>
                        <TextField required id="outlined-basic" label="Recipe Title" variant="outlined" onChange={handleTitle} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField required id="outlined-basic" label="Recipe Image URL" variant="outlined" onChange={handleImage} />
                    </Grid>
                    &nbsp;
                    <Grid>
                        <TextField required id="outlined-basic" label="Prep Time" variant="outlined" onChange={handlePrepTime} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField required id="outlined-basic" label="Cook Time" variant="outlined" onChange={handleCookTime} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField required id="outlined-basic" label="Total Time" variant="outlined" onChange={handleTotalTime} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField required id="outlined-basic" label="Yields" variant="outlined" onChange={handleYields} />
                    </Grid>
                    &nbsp;
                    <Grid>
                        <TextField required sx={{ width: 700 }} id="outlined-multiline-flexible" label="Description" multiline maxRows={10} variant="outlined" onChange={handleDescription} />
                    </Grid>
                    &nbsp;
                    <Grid>
                        <Typography component="h4" variant="body1">
                            For this section: Please separate instructions by pressing enter
                        </Typography>
                        <TextField required sx={{ width: 700 }} id="outlined-multiline-flexible" label="Instruction List" multiline maxRows={10} variant="outlined" onChange={handleInstructions} />
                    </Grid>
                    &nbsp;
                    {/* put select ingredient UI here */}
                    <Button onClick={handleIngredientClickOpen} size="large" variant="contained" sx={{ backgroundColor: "#cc702d", mt: 3, mb: 2, width: 200 }}>
                        Add Ingredient
                    </Button>
                    <Dialog
                        open={ingredientOpen}
                        onClose={handleIngredientClose}
                    >
                        <DialogTitle id="add-ingredients">
                            {"Add an ingredient to your recipe."}
                        </DialogTitle>
                        <DialogContent>
                            <Autocomplete
                                disablePortal
                                freeSolo
                                id="combo-box-demo"
                                options={ingredientArr2}
                                onInputChange={(e, new_val) => { setAddIngr(new_val) }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label="Search Ingredients to Add"
                                        onChange={({ target }) => setAddIngr(target.value)}
                                    />
                                )}
                            />
                        </DialogContent>
                        <DialogActions>
                        <Tooltip title="Create Ingredient">
                            <IconButton edge="end" aria-label="add" onClick={async () => {
                                addButton = true;
                                if (addIngr.localeCompare("") == 0) {
                                    handleClickOpenEmptyString();
                                } else {
                                    var data = await addIngredient(addIngr, addButton)
                                    console.log(data)
                                    if (!data.success) {
                                        handleClickOpenExists();
                                    } else {
                                        setIngredientList([
                                            ...ingredientList, addIngr
                                        ])
                                        handleIngredientClose();
                                    }
                                }
                            }}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                            <Button
                                type="submit"
                                onClick={async () => {
                                    addButton = false;
                                    var data = await addIngredient(addIngr, addButton);
                                    if (!data.success) {
                                        //if ingredient does not exist
                                        handleClickOpenDoesntExist();
                                    }
                                    else {
                                        setIngredientList([
                                            ...ingredientList, addIngr
                                        ])
                                        handleIngredientClose();
                                    }
                                }}
                            >
                                Add
                            </Button>
                            <Button onClick={handleIngredientClose} autoFocus>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                    &nbsp;
                    <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
                        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ingredients</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Unit</TableCell>
                                </TableRow>
                                {ingredientList.map((ingredient) => (
                                    displayIngredients(ingredient)
                                ))}
                            </TableHead>
                            <TableBody>

                            </TableBody>
                        </Table>
                    </TableContainer>
                    &nbsp;
                    <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
                        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nutrients</TableCell>
                                    <TableCell align="right">Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    key={"Calories"}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {"Calories"}
                                    </TableCell>
                                    <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Calories (kcal)" variant="outlined" onChange={handleCalories} />}</TableCell>
                                </TableRow>
                                <TableRow
                                    key={"Carbohydrate Content"}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {"Carbohydrate Content"}
                                    </TableCell>
                                    <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Carbohydrate Content (g)" variant="outlined" onChange={handleCarbs} />}</TableCell>
                                </TableRow>
                                <TableRow
                                    key={"Cholesterol Content"}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {"Cholesterol Content"}
                                    </TableCell>
                                    <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Cholesterol Content (mg)" variant="outlined" onChange={handleCholesterol} />}</TableCell>
                                </TableRow>
                                <TableRow
                                    key={"Fiber Content"}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {"Fiber Content"}
                                    </TableCell>
                                    <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Fiber Content (g)" variant="outlined" onChange={handleFiber} />}</TableCell>
                                </TableRow>
                                <TableRow
                                    key={"Protein Content"}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {"Protein Content"}
                                    </TableCell>
                                    <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Protein Content (g)" variant="outlined" onChange={handleProtein} />}</TableCell>
                                </TableRow>
                                <TableRow
                                    key={"Saturated Fat Content"}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {"Saturated Fat Content"}
                                    </TableCell>
                                    <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Saturated Fat Content (g)" variant="outlined" onChange={handleSaturatedFat} />}</TableCell>
                                </TableRow>
                                <TableRow
                                    key={"Sodium Content"}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {"Sodium Content"}
                                    </TableCell>
                                    <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Sodium Content (mg)" variant="outlined" onChange={handleSodium} />}</TableCell>
                                </TableRow>
                                <TableRow
                                    key={"Fat Content"}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {"Fat Content"}
                                    </TableCell>
                                    <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Fat Content (g)" variant="outlined" onChange={handleFat} />}</TableCell>
                                </TableRow>
                                <TableRow
                                    key={"Unsaturated Fat Content"}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {"Unsaturated Fat Content"}
                                    </TableCell>
                                    <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Unsaturated Fat Content (g)" variant="outlined" onChange={handleUnsaturatedFat} />}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button size="large" variant="contained" sx={{ mt: 3, mb: 2, width: 200 }}
                        onClick={async () => {
                            if (!title | !image | !preptime | !cookTime | !totalTime | !yields | !description | !instructions) {
                                //if any of the required fields are empty, send an error
                                handleClickOpen();
                            }
                            else {
                                //add recipe to database
                                //TODO: also send array of objects (of ingredients) in this call
                                const list = instructions.split("\n")
                                const recipe = await CreateRecipe(title, image, preptime, cookTime, totalTime, yields, description, list,
                                    calories, carbs, cholesterol, fiber, protein, saturatedFat, sodium, fat, unsaturatedFat);
                                await AddTag(recipe.title, false);
                                Router.push({
                                    pathname: "/recipe-view/",
                                    query: { id: recipe._id },
                                    state: { recipe }
                                })
                            }
                        }}>
                        Create Recipe
                    </Button>
                </Box>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Missing Information"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            One or more of the required fields are left blank. Please fill out all required information before creating the recipe.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    //Dialog for when a user is trying to add an ingredient to the database that does not exists
                    fullScreen={fullScreen}
                    open={open4}
                    onClose={handleCloseIngredientError}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Incorrect Ingredient"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This ingredient does not currently exist. Please create the ingredient before trying to use it.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseIngredientError} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    //Dialog when the user is trying to add an ingredient to the database that already exists
                    fullScreen={fullScreen}
                    open={open2}
                    onClose={handleCloseIngredientExists}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Ingredient Already Exists"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This ingredient already exists, therefore you cannot create it.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseIngredientExists} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    //Dialog when the user is trying to add an empty string as an ingredient
                    fullScreen={fullScreen}
                    open={open3}
                    onClose={handleCloseEmptyString}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Invalid Ingredient Name"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please type the name of the ingredient before trying to create it.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEmptyString} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </div>
    );

    async function CreateRecipe(title, image, preptime, cookTime, totalTime, yields, description, instructions,
        calories, carbs, cholesterol, fiber, protein, saturatedFat, sodium, fat, unsaturatedFat, username) {
        try {
            const res = await fetch('/api/createNewRecipe', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    image: image,
                    preptime: preptime,
                    cookTime: cookTime,
                    totalTime: totalTime,
                    yields: yields,
                    description: description,
                    instructions: instructions,
                    calories: calories,
                    carbs: carbs,
                    cholesterol: cholesterol,
                    fiber: fiber,
                    protein: protein,
                    saturatedFat: saturatedFat,
                    sodium: sodium,
                    fat: fat,
                    unsaturatedFat: unsaturatedFat,
                    author: username,
                    isUser: true
                })
            })
            const data = await res.json();
            return data;
        }
        catch {
            return error
        }
    }

    async function AddTag(title, isDefined) {
        try {
            const res = await fetch('/api/recipeAddTags', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
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

    function displayIngredients(ingredient) {
        return (
            <TableRow
                key={ingredient + "content"}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {ingredient}
                </TableCell>
                <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Add Quantity" variant="outlined" onChange={handleQuantity} />}</TableCell>
                <TableCell align="right">{<TextField size="small" id="outlined-basic" label="Add Unit" variant="outlined" onChange={handleUnits} />}</TableCell>
                {console.log(ingredient)}
                {console.log(addQuantity)}
                {console.log(addUnit)}
            </TableRow>
        )
    }
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const ingredientOptions = await db
            .collection("ingredients")
            .find({})
            .toArray();
        return {
            props: { ingredientOptions: JSON.parse(JSON.stringify(ingredientOptions)) },
        };
    }
    catch (e) {
        console.error(e);
    }
}

async function indexMatch(array, q) {
    return array ? array.findIndex(item => q.toUpperCase() === item.toUpperCase()) : -1;
}

async function addIngredient(ingredient, addButton) {
    const res = await fetch('/api/addIngredient', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ingredient: ingredient,
            addButton: addButton
        })
    })
    const data = await res.json();
    console.log(JSON.stringify(data) + " data")
    return data;
}
