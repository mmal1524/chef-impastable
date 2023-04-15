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
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function NotificationEdit(notificationList) {

    const [username, setUsername] = useState("");

    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getUsername: {
                get() {
                    return this.username
                },
            },
        });
        setUsername(thisUser.getUsername);
    }, []);
    console.log(username)
    
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
                    onClick={async () => {
                        setNotificationList([]);
                        var data = await clearNotifications(username);
                        localStorage.setItem('user', JSON.stringify(data));
                    }}
                >
                    Clear
                </Button>
            </Grid>
            {/* <Grid container id="empty">
                List is empty.
            </Grid> */}
            <Grid containter data-test='EditDisplay'>
                {/* {displayList(shoppingList)} */}
                {/*notificationList && notificationList.map((item, index) => (
                    <Box>
                        <FormGroup row>
                        </FormGroup>
                        <Grid container id="Item">
                            <Grid>
                                <List data-test={`ListItem-${index}`}>
                                    <ListItem 
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete"
                                            data-test={`DeleteButton-${index}`}
                                            onClick={async () => {
                                                deleteByIndex(index);
                                                var data = await DeleteListItem(username, item);
                                                localStorage.setItem('user', JSON.stringify(data));
                                            }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText data-test="ListText"
                                            sx={{display: 'flex', justifyContent: 'center'}}
                                            primary={item}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                                    )) */}
                
            </Grid>
        </div>
        </>
    );
}
async function findNotifications(username) {
    const res = await fetch('/api/findNotifications', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            getData: true,
        })
    })
    const data = await res.json();
    console.log(data);
    return data;
}

async function deleteNotifications(username, item) {
    try {
        const res = await fetch('/api/deleteShopListItem', {
            method: 'DELETE',
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
        console.error(e);
    }
}

async function clearNotifications(username) {
    try {
        const res = await fetch('/api/clearShoppingListItems', {
            method: 'DELETE',
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
        console.error(e);
    }
}
async function indexMatch(array, q) {
    //console.log(array);
    return array ? array.findIndex(item => q.toUpperCase() === item.toUpperCase()) : -1;
}