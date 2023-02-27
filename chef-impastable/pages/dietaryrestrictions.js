import * as React from 'react';
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Navbar from './navbar.js'



export default function Home() {
    const [username, setUsername] = useState("");
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
        });
        setUsername(thisUser.getUsername);
        setUserTags(thisUser.getTags);
    }, [])
    return (
        <div className="app-container">
            <div className="App">
                <Navbar />
            </div>

            {userTags && userTags.map((tag, index) => (
                <div>
                    <Box sx={{ flexGrow: 1, maxWidth: 752 }}
                        alignItems='center'
                        justify='center'
                        display='flex'
                    >
                        <FormGroup row>
                        </FormGroup>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <List dense={dense}>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" onClick={async () => {
                                                deleteByIndex(index);
                                                var data = await DeleteTag(username, tag);
                                                localStorage.setItem('user',
                                                    JSON.stringify({
                                                        username: data.username,
                                                        password: data.password,
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
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            ))}

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
                type="AddTag" size="large" variant="contained" sx={{ mt: 3, mb: 2, width: 200 }}
                onClick={async () => {
                    setUserTags(userTags => [...userTags, tagValue]);
                    var data = await AddTag(username, tagValue);
                    localStorage.setItem('user',
                        JSON.stringify({
                            username: data.username,
                            password: data.password,
                            dietaryTags: data.dietaryTags
                        }));
                }}
            >Add Tag
            </Button>
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
