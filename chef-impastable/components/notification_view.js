import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import { Grid, List, ListItemText, Typography } from '@mui/material';
import { useState, useEffect } from "react";

const NotificationView = () => {
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

    
    var shoppingList = [];

    return (
        <>   
        <div >
            <Grid containter id="ViewDisplay">
                {displayNotifications(shoppingList)}
            </Grid>
        </div>
        </>
    );
}

export default NotificationView;

function displayNotifications(shoppingList) {
    if (shoppingList.length > 0) {
        return (
            <Grid id="PopulatedList">
                {shoppingList && shoppingList.map((item, index) => (
                    <Box>
                        <FormGroup row>
                        </FormGroup>
                        <Grid container>
                            <Grid>
                                <List>
                                    <ListItemText
                                        sx={{display: 'flex', justifyContent: 'center'}}
                                        primary={item}
                                    />
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
            </Grid>
        );
    } else {
        return (
            <Grid id="NoNotifications">
                <Typography>No Notifications</Typography>
            </Grid>
        );
    }
}



