import * as React from 'react';
import { Autocomplete, Modal, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Divider, TextField, Grid, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import { useState, useEffect } from "react";
// import { useTheme } from '@material-ui/core/styles';
import { Dialog } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';
import { Snackbar, Alert } from '@mui/material';
import FridgeGroup from './fridge-group';
import Tooltip from '@mui/material/Tooltip';


export default function Fridge(props) {
    const ingredientArr = props.ingredientOptions.map(a => a.ingredient);
    const [ingredientArr2, setIngredientArr2] = useState(ingredientArr)

    const [openEditModal, setOpenEditModal] = useState(false);
    const [addIngr, setAddIngr] = useState("");
    const [searchGroups, setSearchGroup] = useState("");
    const [showError, setShowError] = useState(false);
    const [username, setUsername] = useState("")
    const [openSnackbar, setOpenSnackbar] = useState(false)

    //Dialog popups for errors when adding ingredients to a fridge
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseIngredientError = () => {
        setOpen(false);
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

    //local storage fridge info
    const [userIngr, setUserIngr] = useState([]);
    const [fridgeGrouped, setFridgeGrouped] = useState({})

    // //local storage kitchen info
    // const [userApps, setUserApps] = useState([]);
    const [showDeleted, setShowDeleted] = useState(false)
    // 
    useEffect(() => {
        const thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getUsername: {
                get() {
                    return this.username
                },
            },
            getApps: {
                get() {
                    return this.kitchen
                },
            },
            getIngr: {
                get() {
                    return this.fridge
                }
            },
            getFridgeGrouped: {
                get() {
                    return this.fridge_grouped
                }
            }
        });
        setUserIngr(thisUser.getIngr)
        setFridgeGrouped(thisUser.fridge_grouped)
        setUsername(thisUser.getUsername)
        setIngredientArr2(ingredientArr.filter(ing => userIngr ? !userIngr.includes(ing.toLowerCase()) : true))
    }, [openSnackbar, showDeleted])

    // for search bars
    const [searchFridge, setSearchFridge] = useState("");
    const [idx, setIdx] = useState(-1);
    const handleChangeFridge = e => {
        setSearchFridge(e.target.value);
    }

    // https://mui.com/material-ui/react-snackbar/#customization
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false)
        setShowError(false)
        setShowDeleted(false)
    };

    // used for handling if the ingredient should be added to the database or not
    var addButton; 

    return (
        <>
            <Snackbar open={showDeleted} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity="success" onClose={handleClose}>Ingredient deleted!</Alert>
            </Snackbar>
            <Snackbar open={showError} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose}>Error: Ingredient is already in fridge</Alert>
            </Snackbar>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity="success" onClose={handleClose}>Ingredient added!</Alert>
            </Snackbar>
            <Dialog open={openEditModal} onClose={() => { setOpenEditModal(false) }} >
                <DialogTitle>Add Ingredient to Fridge</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        freeSolo
                        options={fridgeGrouped ? Object.keys(fridgeGrouped).map((option) => option) : []}
                        //renderOption={(props, option) => <li {...props}>{option.title}</li>}
                        onInputChange={(e, new_val) => { setSearchGroup(new_val) }}
                        //sx={{ width: windowSize[0]/3 }}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="New or Existing Group Name"
                                onChange={({ target }) => setSearchGroup(target.value)}
                            />
                        )}
                    />
                    
                    <span>&nbsp;</span>
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
                    <Button
                        type="submit"
                        size="large"
                        variant="contained"
                        sx={{
                            mx: 3,
                            mt: 1,
                        }}
                        onClick={async () => {
                            //search for appliance
                            var idxx = await indexMatch(userIngr, addIngr);
                            //console.log(idxx)
                            if (idxx == -1) {
                                addButton = false;
                                var data = await addIngredient(addIngr, searchGroups, username, addButton)
                                if (!data.success) {
                                    handleClickOpen();
                                } else {
                                    localStorage.setItem('user',
                                        JSON.stringify({
                                            username: data.username,
                                            password: data.password,
                                            fridge: data.fridge,
                                            fridge_grouped: data.fridge_grouped,
                                            kitchen: data.kitchen,
                                            displayName: data.displayName,
                                            avatar: data.avatar,
                                            friends: data.friends,
                                            friendRequests: data.friendRequests,
                                            createdPrivacy: data.createdPrivacy,
                                            savedPrivacy: data.savedPrivacy,
                                            reviewedPrivacy: data.reviewedPrivacy,
                                            dietaryTags: data.dietaryTags
                                        }));
                                    setAddIngr("")
                                    console.log(addIngr, searchGroups)
                                    setOpenSnackbar(true)
                                }
                            }
                            else {
                                setShowError(true)
                            }
                            //console.log("right after set, idx val:",idx);
                        }}
                    >
                        Enter
                    </Button>
                    <Tooltip title="Create Ingredient">
                    <IconButton edge="end" aria-label="add" onClick={async () => { 
                            addButton = true;
                            if (addIngr.localeCompare("") == 0) {
                                handleClickOpenEmptyString();
                            } else {
                            var data = await addIngredient(addIngr, searchGroups, username, addButton)
                            console.log(data)
                            if (!data.success) {
                                handleClickOpenExists();
                            } else {
                                localStorage.setItem('user',
                                    JSON.stringify({
                                        username: data.username,
                                        password: data.password,
                                        fridge: data.fridge,
                                        fridge_grouped: data.fridge_grouped,
                                        kitchen: data.kitchen,
                                        displayName: data.displayName,
                                        avatar: data.avatar,
                                        friends: data.friends,
                                        friendRequests: data.friendRequests,
                                        createdPrivacy: data.createdPrivacy,
                                        savedPrivacy: data.savedPrivacy,
                                        reviewedPrivacy: data.reviewedPrivacy,
                                        dietaryTags: data.dietaryTags
                                    }));
                                setAddIngr("")
                                console.log(addIngr, searchGroups)
                                setOpenSnackbar(true)
                            }
                        }
                    }}>
                        <AddIcon />
                    </IconButton>
                    </Tooltip>
                </DialogContent>
                <Dialog
                    //Dialog for when a user is trying to add an ingredient to the database that does not exists
                    fullScreen={fullScreen}
                    open={open}
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
                {/* TODO: Make the modal show up better */}
                {/* <Modal open={showError} onClose={()=>{setShowError(false)}}>
                    <Box>
                        <Typography>
                            Error: Ingredient is already in fridge
                        </Typography>
                    </Box>
                </Modal> */}
            </Dialog>


            {/* Fridge content starts here */}
            <Grid container>
                <Grid item>
                    <TextField
                        id="search-fridge"
                        label="Search"
                        variant="outlined"
                        sx={{
                            width: 600
                        }}
                        onChange={handleChangeFridge}
                    />
                    <Button
                        //type="submit" 
                        size="large"
                        variant="contained"
                        sx={{
                            mx: 3,
                            mt: 1,
                        }}
                        onClick={async () => {
                            //search for ingredient
                            var idxx = await indexMatch(userIngr, searchFridge);
                            setIdx(idxx);
                        }}>
                        Enter
                    </Button>
                </Grid>
                <Grid item xs></Grid>
                <Grid item>
                    <Button
                        //type="submit" 
                        size="large"
                        variant="contained"
                        sx={{
                            mx: 3,
                            mt: 1,
                        }}
                        onClick={() => {
                            //route to edit page
                            // console.log(Object.keys(fridgeGrouped))
                            setOpenEditModal(true);
                        }}>
                        Edit Fridge
                    </Button>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Grid container>
                        {fridgeGrouped ? Object.keys(fridgeGrouped).map((group) => (
                            <Grid item key={group}>
                                <FridgeGroup username={username} name={group} ingredients={fridgeGrouped[group]} delete={() => setShowDeleted(true)} />
                            </Grid>
                        )) : <div></div>}
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/* List ingredients */}
                    {userIngr && userIngr.map((ingr, index) => (
                        <Box>
                            <FormGroup row>
                            </FormGroup>
                            <Grid container>
                                <Grid
                                    item xs={12}
                                    md={6}
                                    sx={{
                                        width: 1200,
                                        //width: windowSize[0],
                                        backgroundColor: index === idx ? 'greenyellow' : 'white',
                                    }}
                                >
                                    <List>
                                        <ListItemText
                                            sx={{ display: 'flex', justifyContent: 'center' }}
                                            primary={ingr}
                                        />
                                    </List>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </>
    )
}

// returns index if match of q is found within given array
// both are toUpperCase so search is case insensitive
async function indexMatch(array, q) {
    //console.log(array);
    return array ? array.findIndex(item => q.toUpperCase() === item.toUpperCase()) : -1;
}

async function addIngredient(ingredient, group, username, addButton) {
    //try {
    const res = await fetch('/api/addIngredientToFridge', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ingredient: ingredient,
            group: group,
            username: username,
            addButton: addButton
        })
    })
    const data = await res.json();
    console.log(data);
    return data;
    //} catch (error) {
    //    res.json(error);
    //    return res.status(405).end();
    //}
}


