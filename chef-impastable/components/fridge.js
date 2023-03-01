import * as React from 'react';
// import Link from 'next/link';
import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import PropTypes from 'prop-types';
// import Typography from '@mui/material/Typography';
import { Divider, TextField, Grid, DialogTitle, DialogContent } from '@mui/material';
// import Navbar from './navbar.js'
import Button from '@mui/material/Button';
import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
// import { useTheme } from '@material-ui/core/styles';
import { Dialog } from '@mui/material';


export default function Fridge() {
    const [openEditModal, setOpenEditModal] = useState(false);

    //local storage fridge info
    const [userIngr, setUserIngr] = useState([]);

    // //local storage kitchen info
    // const [userApps, setUserApps] = useState([]);

    // 
    useEffect(() => {
        const thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
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
        });
        setUserIngr(thisUser.getIngr)
        // setUserApps(thisUser.getApps);
    }, [])

    return (
        <>
        <Dialog open={openEditModal} onClose={()=>{setOpenEditModal(false)}}>
            <DialogTitle>Add Ingredient to Fridge</DialogTitle>
            <DialogContent>
            <TextField
                    id="search-kitchen"
                    label="Search"
                    variant="outlined"
                    //onChange={handleChangeKitchen}
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
                        var idxx = await indexMatch(userApps, searchKitchen);
                        //console.log(idxx)
                        setIdx(idxx);
                        //console.log("right after set, idx val:",idx);
                    }}
                >
                    Enter
                </Button>
            </DialogContent>
        </Dialog>

        <Grid container>
            <Grid item>
                <TextField
                    id="search-fridge"
                    label="Search"
                    variant="outlined"
                    sx={{
                    width: 600
                    }}
                />
                <Button 
                    //type="submit" 
                    size="large"
                    variant="contained"
                    sx={{
                        mx: 3,
                        mt: 1,
                    }}
                    onClick={() => {
                        //search for ingredient
                        console.log("clicked")
                    }}
                >
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
                        console.log("clicked edit fridge")
                        setOpenEditModal(true);
                    }}
                >
                    Edit Fridge
                </Button>
            </Grid>
        </Grid>
        <Grid container>
            {/* List ingredients */}
            {userIngr && userIngr.map((ingr, index) => (
                <Box>
                    <FormGroup row>
                    </FormGroup>
                    <Grid container>
                        <Grid 
                            item xs={12} 
                            md={6}
                            sx={{ width: windowSize[0]}}
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
        </>
    )
}

async function indexMatch(array, q) {
    return array.findIndex(item => q.toUpperCase().contains(item.toUpperCase()));
}