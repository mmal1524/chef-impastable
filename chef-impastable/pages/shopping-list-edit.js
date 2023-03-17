import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const ShoppingList = () => {

    const [shoppingList, setShoppingList] = useState("");
    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getShoppingList: {
                get() {
                    return this.shoppingList
                },
            },
        });
        setShoppingList(thisUser.getShoppingList);
        // var emptyList = document.getElementById("empty");
        // if (shoppingList.length == 0) {
        //     emptyList.style.display = "block";
        // } else {
        //     emptyList.style.display = "none";
        // }
    }, []);

    return (
        <>   
        <div >
            <Grid container>
                search bar here
            </Grid>
            {/* <Grid container id="empty">
                List is empty.
            </Grid> */}
            <Grid containter>
                {shoppingList && shoppingList.map((item, index) => (
                    <Box>
                        <FormGroup row>
                        </FormGroup>
                        <Grid container>
                            <Grid>
                                <List>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" 
                                            // onClick={async () => {
                                            //     deleteByIndex(index);
                                            //     var data = await DeleteTag(username, tag);
                                            //     localStorage.setItem('user',
                                            //         JSON.stringify({
                                            //             username: data.username,
                                            //             password: data.password,
                                            //             fridge: data.fridge,
                                            //             kitchen: data.kitchen,
                                            //             displayName: data.displayName,
                                            //             avatar: data.avatar,
                                            //             friends: data.friends,
                                            //             friendRequests: data.friendRequests,
                                            //             dietaryTags: data.dietaryTags,
                                            //             fridge_grouped: data.fridge_grouped,
                                            //             createdPrivacy: data.createdPrivacy,
                                            //             savedPrivacy: data.savedPrivacy,
                                            //             reviewedPrivacy: data.reviewedPrivacy,
                                            //             mealPlanPrivacy: data.mealPlanPrivacy
                                            //         }));
                                            // }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText
                                            sx={{display: 'flex', justifyContent: 'center'}}
                                            primary={item}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
                
            </Grid>
        </div>
        </>
    );
}

export default ShoppingList;



