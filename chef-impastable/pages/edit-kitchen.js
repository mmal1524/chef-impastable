import * as React from 'react';
import Link from 'next/link';
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
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export default function EditKitchen() {

    const [username, setUsername] = useState("");
    const [appValue, setAppUser] = useState("");
    const [userApps, setUserApps] = useState([]);
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

    return (
        <>   
        <div>
            <Grid container>
                <Grid item>
                    <TextField
                        id="search-kitchen"
                        label="Search"
                        variant="outlined"
                        sx={{
                            width:  600
                        }}
                    />
                    <Button 
                        type="submit" 
                        size="large"
                        variant="contained"
                        sx={{
                            mx: 3,
                            mt: 1,
                        }}
                        onClick={() => {
                            //search for appliance
                            console.log("clicked")
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
                        Edit Kitchen
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
                                                            kitchen: data.kitchen
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
        </>
    );
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