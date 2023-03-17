import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const ShoppingListEdit = () => {

    const [username, setUsername] = useState("");
    const [shoppingList, setShoppingList] = useState("");

    const deleteByIndex = index => {
        setShoppingList(oldValues => {
            return oldValues.filter((_, i) => i !== index)
        })
    }
    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getShoppingList: {
                get() {
                    return this.shoppingList
                },
            },
            getUsername: {
                get() {
                    return this.username
                }
            }
        });
        setShoppingList(thisUser.getShoppingList);
        setUsername(thisUser.getUsername);
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
                                            onClick={async () => {
                                                deleteByIndex(index);
                                                var data = await DeleteListItem(username, item);
                                                console.log(localStorage.getItem('user'))
                                                localStorage.setItem('user',
                                                    JSON.stringify({
                                                        username: data.username,
                                                        password: data.password,
                                                        fridge: data.fridge,
                                                        kitchen: data.kitchen,
                                                        shoppingList: data.shoppingList,
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
                                                console.log(localStorage.getItem('user'));
                                            }}
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

export default ShoppingListEdit;

async function DeleteListItem(username, item) {
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
        return error
    }
}



