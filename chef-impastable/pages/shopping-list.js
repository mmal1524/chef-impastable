import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import { Grid, List, ListItemText, Typography } from '@mui/material';
import { useState, useEffect } from "react";

const ShoppingList = () => {
    console.log(JSON.parse(localStorage.getItem('user')));
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
    }, []);

    return (
        <>   
        <div >
            <Grid containter>
                {displayList(shoppingList)}
                {/* {shoppingList && shoppingList.map((item, index) => (
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
                ))} */}
                
            </Grid>
        </div>
        </>
    );
}

export default ShoppingList;

function displayList(shoppingList) {
    if (shoppingList.length > 0) {
        return (
            <Grid>
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
            <Grid>
                <Typography>Your List is Empty, add something!</Typography>
            </Grid>
        );
    }
}



