import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import { Grid, List, ListItemText, Typography } from '@mui/material';
import { useState, useEffect } from "react";

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
        // console.log(shoppingList.length);
        // if (shoppingList.length != 0) {
        //     emptyList.style.display = "block";
        // } else {
        //     emptyList.style.display = "none";
        // }
    }, []);

    return (
        <>   
        <div >
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
        </div>
        </>
    );
}

export default ShoppingList;



