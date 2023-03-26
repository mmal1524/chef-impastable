import * as React from 'react';
import { Autocomplete, Modal, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { TextField, Grid, DialogTitle, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import { useState, useEffect } from "react";
import { Dialog } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import FridgeGroup from './fridge-group';

export default function Fridge(props) {
    const ingredientArr = props.ingredientOptions.map(a => a.ingredient);
    const [ingredientArr2, setIngredientArr2]  =useState(ingredientArr)

    const [openEditModal, setOpenEditModal] = useState(false);
    const [addIngr, setAddIngr] = useState("");
    const [searchGroups, setSearchGroup] = useState("");
    const [showError, setShowError] = useState(false);
    const [username, setUsername] = useState("")
    const [openSnackbar, setOpenSnackbar] = useState(false)

    //local storage fridge info
    const [userIngr, setUserIngr] = useState([]);
    const [fridgeGrouped, setFridgeGrouped] = useState({})

    // //local storage kitchen info
    const [showDeleted, setShowDeleted] = useState(false)

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
        <Dialog open={openEditModal} onClose={()=>{setOpenEditModal(false)}}>
            <DialogTitle>Add Ingredient to Fridge</DialogTitle>
            <DialogContent>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    freeSolo
                    options={fridgeGrouped ? Object.keys(fridgeGrouped).map((option) => option) : [] }
                    onInputChange={(e, new_val) => {setSearchGroup(new_val)}}
                    renderInput={params => (
                        <TextField 
                            {...params} 
                            label="New or Existing Group Name"
                            onChange={({ target }) => setSearchGroup(target.value)} 
                        />
                    )}
                />
                <Autocomplete
                    disablePortal
                    freeSolo
                    id="combo-box-demo"
                    options={ingredientArr2}
                    onInputChange={(e, new_val) => {console.log(new_val); setAddIngr(new_val)}}
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
                        if (idxx == -1) {
                            var data = await addIngredient(addIngr, searchGroups, username)
                            localStorage.setItem('user', JSON.stringify(data));
                            setAddIngr("")
                            console.log(addIngr, searchGroups)
                            setOpenSnackbar(true)
                        }
                        else {
                            setShowError(true)
                        }
                    }}
                >
                    Enter
                </Button>
                </DialogContent>
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
                        }}
                    >
                        Enter
                    </Button>
                </Grid>
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
                            setOpenEditModal(true);
                        }}
                    >
                        Edit Fridge 
                    </Button>
            </Grid>
        </Grid>
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Grid container>
                    {fridgeGrouped ? Object.keys(fridgeGrouped).map((group) => (
                        <Grid item key={group}>
                                <FridgeGroup username={username} name={group} ingredients={fridgeGrouped[group]}  delete={() => setShowDeleted(true)}/>
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
                                    backgroundColor: index === idx ? 'greenyellow' : 'white',
                                }}
                            >
                                <List>
                                    <ListItemText
                                        sx={{display:'flex', justifyContent:'center'}}
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
    return array ? array.findIndex(item => q.toUpperCase() === item.toUpperCase()) : -1;
}

async function addIngredient(ingredient, group, username) {
    const res = await fetch('/api/addIngredientToFridge', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ingredient: ingredient,
            group: group,
            username: username
        })
    })
    const data = await res.json();
    return data;
}

