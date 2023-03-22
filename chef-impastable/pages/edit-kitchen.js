import * as React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Divider, TextField, Grid, ListItem } from '@mui/material';
import Navbar from './navbar.js'
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import clientPromise from "../lib/mongodb_client";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function EditKitchen({appliances}) {

    const kitchenArr = appliances.map(a => a.name);
    //console.log(kitchenArr[0]);

    const [username, setUsername] = useState("");
    const [userApps, setUserApps] = useState([]);
    const [searchKitchen, setSearchKitchen] = useState("");
    console.log(searchKitchen);
    const deleteByIndex = index => {
        setUserApps(oldValues => {
            return oldValues.filter((_, i) => i !== index)
        })
    }
    useEffect(() => {
        const thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getApps: {
                get() {
                    return this.kitchen
                },
            },
            getUsername: {
                get() {
                    return this.username
                }
            },
        });
        setUsername(thisUser.getUsername);
        setUserApps(thisUser.getApps);
    }, [])

    const [windowSize, setWindowSize] = useState([1400,0,]);
    useEffect(() => {
        const handleWindowResize = () => {
          setWindowSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', handleWindowResize);
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    });
    const router = useRouter();

    
    const handleChangeKitchen = (event, newValue) => {
        setSearchKitchen(newValue);
        console.log(searchKitchen);
    }
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [openE, setOpenE] = useState(false);
    const handleClickOpenE = () => {
        setOpenE(true);
    };
    const handleCloseE = () => {
        setOpenE(false);
    };
    const [openD, setOpenD] = useState(false);
    const handleClickOpenD = () => {
        setOpenD(true);
    };
    const handleCloseD = () => {
        setOpenD(false);
    };


    return (
        <>   
        <div>
            <Grid container>
                <Grid item>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={kitchenArr}
                        onInputChange={handleChangeKitchen}
                        sx={{ width: windowSize[0]/3 }}
                        renderInput={params => (
                            <TextField 
                                {...params} 
                                label="Search Available Appliances"
                                onChange={({ target }) => setSearchKitchen(target.value)} 
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
                        onClick={ async() => {
                            //search for appliance
                            console.log(searchKitchen);
                            if (typeof searchKitchen === 'undefined') {
                                handleClickOpenE();
                                console.log("error");
                            } else {
                                var idx = await indexMatch(userApps, searchKitchen);
                                if (idx > -1) {
                                    // error message, don't add bc duplicate
                                    handleClickOpenD();
                                } else {
                                    var idx = await indexMatch(kitchenArr, searchKitchen);
                                    if (idx < 0) {
                                        // error message
                                        handleClickOpenE();
                                        console.log("error");
                                    } else {
                                        setUserApps(userApps => [...userApps, searchKitchen]);
                                        var data = await AddApp(username, searchKitchen);
                                        localStorage.setItem('user',
                                            JSON.stringify({
                                                username: data.username,
                                                password: data.password,
                                                fridge: data.fridge,
                                                kitchen: data.kitchen,
                                                displayName: data.displayName,
                                                avatar: data.avatar,
                                                friends: data.friends,
                                                friendRequests: data.friendRequests,
                                                dietaryTags: data.dietaryTags,
                                                fridge_grouped: data.fridge_grouped,
                                                createdPrivacy: data.createdPrivacy,
                                                savedPrivacy: data.savedPrivacy,
                                                reviewedPrivacy: data.reviewedPrivacy,
                                                mealPlanPrivacy: data.mealPlanPrivacy
                                        }));
                                        console.log(data.username);
                                    }
                                }
                            }
                        }}
                        >
                            Enter
                        </Button>
                </Grid>
                <Grid item xs></Grid>
                <Grid item>
                    <Button 
                        type="submit" 
                        size="large"
                        variant="contained"
                        sx={{
                            mx: 2,
                            mt: 1,
                        }}
                        onClick={() => {
                            router.push('/fridge-kitchen');
                            console.log("clicked")
                        }}
                    >
                        Done
                    </Button>
                </Grid>
                <Grid container sx={{ my: 2, }}>
                    <Typography>These are your owned appliances.</Typography>
                </Grid>
                <Grid container>
                    {userApps && userApps.map((app, index) => (
                        <Box>
                            <FormGroup row>
                            </FormGroup>
                            <Grid container>
                                <Grid 
                                    item xs={12} 
                                    md={6}
                                    sx={{ width: windowSize[0] }}
                                >
                                    <List>
                                        <ListItem
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete" onClick={async () => {
                                                    deleteByIndex(index);
                                                    var data = await DeleteApp(username, app);
                                                    localStorage.setItem('user',
                                                        JSON.stringify({
                                                            username: data.username,
                                                            password: data.password,
                                                            fridge: data.fridge,
                                                            kitchen: data.kitchen,
                                                            displayName: data.displayName,
                                                            avatar: data.avatar,
                                                            friends: data.friends,
                                                            friendRequests: data.friendRequests,
                                                            dietaryTags: data.dietaryTags,
                                                            fridge_grouped: data.fridge_grouped,
                                                            createdPrivacy: data.createdPrivacy,
                                                            savedPrivacy: data.savedPrivacy,
                                                            reviewedPrivacy: data.reviewedPrivacy,
                                                            mealPlanPrivacy: data.mealPlanPrivacy,
                                                            reviewedRecipes: data.reviewedRecipes
                                                        }));
                                                }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText
                                                sx={{display:'flex', justifyContent:'center'}}
                                                primary={app} 
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </div>
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={openE}
                onClose={handleCloseE}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Incorrect Appliance"}
                </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Error. Appliance cannot be added to database. Please check spelling.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseE} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
            </Dialog>
            <Dialog
                fullScreen={fullScreen}
                open={openD}
                onClose={handleCloseD}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Incorrect Appliance"}
                </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Error. Appliance already owned and cannot be added again.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseD} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
            </Dialog>
        </div>
        </>
    );
}

async function AddApp(username, app) {
    try {
        const res = await fetch('/api/kitchen-add', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                app: app,
            })
        })
        const data = await res.json();
        return data;
    }
    catch (error) {
        return error;
    }
}

async function DeleteApp(username, app) {
    try {
        const res = await fetch('/api/kitchen-delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                app: app,
            })
        })
        const data = await res.json();
        return data;
    } catch {
        return error
    }
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const appliances = await db
            .collection("appliances")
            .find({})
            .toArray();
        //console.log(appliances);
        return {
            //props: { appliances }
            props: {appliances: JSON.parse(JSON.stringify(appliances))},
        };
    }
    catch (e) {
        console.error(e);
    }
    
}


async function indexMatch(array, q) {
    console.log(q);
    return array.findIndex(item => q.toUpperCase() === item.toUpperCase());
}