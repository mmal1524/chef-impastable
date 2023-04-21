import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import { Grid, List, ListItem, ListItemText, TextField } from '@mui/material';
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import { Autocomplete } from '@mui/material';
import { Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Delete } from '@mui/icons-material';
import { useRouter } from "next/router";

export default function NotificationEdit(props) {

    const router = useRouter();

    const [username, setUsername] = useState("");
    const [friends, setFriends] = useState([]);
    const [newFriendNotif, setNewFriendNotif] = useState([]);
    const [newSharedNotif, setNewSharedNotif] = useState([]);

    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getUsername: {
                get() {
                    return this.username
                },
            },
            getFriends: {
                get() {
                    return this.friends
                },
            },
            getNewFriendNotif: {
                get() {
                    return this.newFriendNotif
                },
            },
            getNewSharedNotif: {
                get() {
                    return this.newSharedNotif
                },
            }
        });
        setUsername(thisUser.getUsername);
        setFriends(thisUser.getFriends);
        setNewFriendNotif(thisUser.getNewFriendNotif);
        setNewSharedNotif(thisUser.getNewSharedNotif);
    }, []);
    console.log(username);
    console.log(friends);
    console.log(newFriendNotif);
    console.log(newSharedNotif);

    const deleteFriendByIndex = index => {
        setNewFriendNotif(oldValues => {
            return oldValues.filter((_, i) => i !== index)
        })
    }
    const deleteSharedByIndex = index => {
        var sender = newSharedNotif[index];
        var tempArray = [];
        var i = 0;
        for (i; i < newSharedNotif.length; i++) {
            if (newSharedNotif[i] != sender) {
                tempArray.push(newSharedNotif[i]);
            }
        }
        setNewSharedNotif(tempArray);
        // console.log(index);
        // setNewSharedNotif(oldValues => {
        //     return oldValues.filter((_, i) => i !== index)
        // })
    }
    // var i = 0;
    // for (i = 0; i < newFriendNotif.length; i++) {
    //     var user = newFriendNotif[i].split(" ")[0];
    //     console.log(user);
    //     if (friends.includes(user)) {

    //     }
    // }
    
    // for messages
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>   
        <div sx={{width: 800}}>
            <Grid container 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pt:1,
                    
                }}
            >
                <Button
                    // CLEAR button that gets rid of all notifications
                    data-test='ClearItem'
                    type="submit" 
                    size="small" 
                    variant="outlined"
                    startIcon={<ClearIcon/>}
                    sx={{width: 110, color:'red', borderColor:'red'}}
                    onClick={() => {props.onClear()
                    //     async () => {
                        setNewFriendNotif([]);
                        setNewSharedNotif([]);}
                    //     // new one for each field
                    //     var data = await clearNotifications(username);
                    //     localStorage.setItem('user', JSON.stringify(data));
                    // }
                    }
                >
                    Clear
                </Button>
            </Grid>
            <Grid containter data-test='EditDisplay'>
                <h3 className="h3">New friend requests</h3>
                <Divider />
                {newFriendNotif && newFriendNotif.map((item, index) => (
                    <Box>
                        <FormGroup row>
                        </FormGroup>
                        <Grid container id="Item">
                            <Grid>
                                <List>
                                    <ListItem>
                                        <ListItemText data-test="ListText"
                                            sx={{display: 'flex', justifyContent: 'left'}}
                                            primary={item}
                                        />
                                        
                                        <ListItemIcon edge="end">
                                            <FullscreenIcon
                                            aria-label="delete"
                                                data-test={`DeleteButton-${index}`}
                                                onClick={async () => {
                                                    router.push({ pathname: "/profile-page/", query: { username: username } });

                                                    deleteFriendByIndex(index);
                                                    var data = await deleteFriend(username, item);
                                                    localStorage.setItem('user', JSON.stringify(data));
                                                }}
                                            />       
                                        </ListItemIcon>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                    ))}
                
            </Grid>
                <h3 className="h3">New shared recipes</h3>
                <Divider />
                {newSharedNotif && newSharedNotif.map((item, index) => (
                    <Box>
                        <FormGroup row>
                        </FormGroup>
                        <Grid container id="Item">
                            <Grid>
                                <List>
                                <ListItem>
                                        <ListItemText data-test="ListText"
                                            sx={{display: 'flex', justifyContent: 'left'}}
                                            primary={item}
                                        />
                                        
                                        <ListItemIcon edge="end">
                                            <FullscreenIcon
                                            aria-label="delete"
                                                data-test={`DeleteButton-${index}`}
                                                onClick={async () => {
                                                    router.push({ pathname: "sharing-page", query: { username: username } });

                                                    deleteSharedByIndex(index);
                                                    var data = await deleteShare(username, item);
                                                    localStorage.setItem('user', JSON.stringify(data));
                                                }}
                                            />       
                                        </ListItemIcon>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                    ))}
                
        </div>
        </>
    );
}

async function deleteFriend(username, item) {
    try {
        const res = await fetch('/api/deleteFriendNotif', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                item: item,
            })
        })
        const data = await res.json();
        return data;
    } catch {
        console.error("Could not delete notifications");
    }
}

async function deleteShare(username, item) {
    try {
        const res = await fetch('/api/deleteShareNotif', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                item: item,
            })
        })
        const data = await res.json();
        return data;
    } catch {
        console.error("Could not delete notification");
    }
}

async function clearNotifications(username) {
    try {
        const res = await fetch('/api/clearNotifs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
            })
        })
        const data = await res.json();
        return data;
    } catch {
        console.error("no notifications to clear");
    }
}