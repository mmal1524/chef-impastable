import * as React from 'react';
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Navbar from './navbar.js'
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';

export default function Home() {
    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [tagValue, setTagUser] = useState("");
    const [userTags, setUserTags] = useState([]);
    const [dense, setDense] = React.useState(false);

    const handleAddTag = e => {
        setTagUser(e.target.value)
    }
    const deleteByIndex = index => {
        setUserTags(oldValues => {
            return oldValues.filter((_, i) => i !== index)
        })
    }
    useEffect(() => {
        const thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getTags: {
                get() {
                    return this.dietaryTags
                },
            },
            getUsername: {
                get() {
                    return this.username
                }
            },
            getDisplayName: {
                get() {
                    return this.displayName
                }
            },
        });
        setUsername(thisUser.getUsername);
        setUserTags(thisUser.getTags);
        setDisplayName(thisUser.getDisplayName);
    }, [])
    return (
        <div className="app-container">
            <div className="App">
                <Navbar />
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center' }}>
            <h1>{displayName}'s Dietary Restrictions</h1>
            </div>
            {userTags && userTags.map((tag, index) => (
                <div>
                    <Box >
                        <Grid container spacing={2}>
                            <Grid item xs={12}
                            alignItems='center'
                            justifyContent='center'
                            display='flex' >
                                <TableContainer component={Paper} sx={{ maxWidth: 800 }} square={true}>
                                
                                <List dense={dense}>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" onClick={async () => {
                                                deleteByIndex(index);
                                                var data = await DeleteTag(username, tag);
                                                localStorage.setItem('user',
                                                    JSON.stringify({
                                                        username: data.username,
                                                        displayName: data.displayName,
                                                        avatar: data.avatar,
                                                        friends: data.friends,
                                                        friendRequests: data.friendRequests,
                                                        createdPrivacy: data.createdPrivacy,
                                                        savedPrivacy: data.savedPrivacy,
                                                        reviewedPrivacy: data.reviewedPrivacy,
                                                        dietaryTags: data.dietaryTags
                                                    }));
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText 
                                            primary={tag}
                                        />
                                    </ListItem>
                                </List>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            ))}

            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center' }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-standard-label">Dietary Restrictions</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={tagValue}
                    onChange={handleAddTag}
                    label="Dietary Restrictions"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Lactose"}>Lactose</MenuItem>
                    <MenuItem value={"Gluten"}>Gluten</MenuItem>
                    <MenuItem value={"Vegetarian"}>Vegetarian</MenuItem>
                    <MenuItem value={"Vegan"}>Vegan</MenuItem>
                    <MenuItem value={"Dairy"}>Dairy</MenuItem>
                    <MenuItem value={"Nuts"}>Nuts</MenuItem>
                    <MenuItem value={"Peanuts"}>Peanuts</MenuItem>
                    <MenuItem value={"Wheat"}>Wheat</MenuItem>
                    <MenuItem value={"Shellfish"}>Shellfish</MenuItem>
                    <MenuItem value={"Fish"}>Fish</MenuItem>
                </Select>
            </FormControl>
            
            <Button
                type="AddTag" size="large" variant="contained" sx={{ mt: 3, mb: 2, width: 200, maxHeight: '35px' }}
                onClick={async () => {
                    setUserTags(userTags => [...userTags, tagValue]);
                    var data = await AddTag(username, tagValue);
                    localStorage.setItem('user',
                        JSON.stringify({
                            username: data.username,
                            password: data.password,
                            displayName: data.displayName,
                            avatar: data.avatar,
                            friends: data.friends,
                            friendRequests: data.friendRequests,
                            createdPrivacy: data.createdPrivacy,
                            savedPrivacy: data.savedPrivacy,
                            reviewedPrivacy: data.reviewedPrivacy,
                            mealPlanPrivacy: data.mealPlanPrivacy,
                            dietaryTags: data.dietaryTags
                        }));
                }}
            >Add Tag
            </Button>
            </div>
        </div >
    );
}

async function AddTag(username, tag) {
    try {
        const res = await fetch('/api/dietarytagsadd', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                tag: tag,
            })
        })
        const data = await res.json();
        return data;
    }
    catch (error) {
        return error;
    }
}

async function DeleteTag(username, tag) {
    try {
        const res = await fetch('/api/dietarytagsdelete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                tag: tag,
            })
        })
        const data = await res.json();
        return data;
    } catch {
        return error
    }
}
