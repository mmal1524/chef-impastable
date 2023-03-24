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

export default function CreateRecipe() {
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
    //add ingredient
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
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleCookTime = e => {
        setcookTime(e.target.value)
    }
    const handleDescription = e => {
        setdescription(e.target.value)
    }
    const handleImage = e => {
        setImage(e.target.value)
    }
    //add ingredient
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
                    username: username,
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
}
