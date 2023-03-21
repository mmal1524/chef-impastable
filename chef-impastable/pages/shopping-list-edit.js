import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import { Grid, List, ListItem, ListItemText, TextField } from '@mui/material';
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Autocomplete } from '@mui/material';
//import clientPromise from "../lib/mongodb_client";

export default function ShoppingListEdit() {

    const [username, setUsername] = useState("");
    const [shoppingList, setShoppingList] = useState("");
    const [fridge, setFridge] = useState([]);
    const [addIngr, setAddIngr] = useState("");

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
                },
            },
            getFridge: {
                get() {
                    return this.fridge
                },
            },
        });
        setShoppingList(thisUser.getShoppingList);
        setUsername(thisUser.getUsername);
        setFridge(thisUser.getFridge);
        // var emptyList = document.getElementById("empty");
        // if (shoppingList.length == 0) {
        //     emptyList.style.display = "block";
        // } else {
        //     emptyList.style.display = "none";
        // }
    }, []);

    // for autocomplete search bar
    const ingrArr = JSON.parse(localStorage.getItem('ing')).map(a => a.ingredient);
    //console.log(ingrArr);
    const [ingrArr2, setIngrArr2] = useState(ingrArr);
    useEffect(() => {
        setIngrArr2(ingrArr.filter(ing => shoppingList ? (!fridge.includes(ing.toLowerCase()) && !shoppingList.includes(ing.toLowerCase())) : true))
        //console.log(ingrArr2)
    })

    return (
        <>   
        <div sx={{width: 800}}>
            <Grid container 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pt:1,
                    //width: '38vw'
                }}
            >
                <Autocomplete
                    disablePortal
                    freeSolo
                    id="for-search"
                    options={ingrArr2}
                    onInputChange={(e, new_val) => {console.log(new_val); setAddIngr(new_val)}}
                    renderInput={params => (
                        <TextField 
                        {...params}
                        label="Search for Items" id="Search Bar" 
                        sx={{width: 400}}
                        onChange={({ target }) => setAddIngr(target.value)}
                        />
                    )}
                />
                <Button
                    type="submit" 
                    size="large" 
                    variant="contained"
                    sx={{width: 130}}
                    onClick={async () => {
                        // check if already in shopping list
                        var idxSL = await indexMatch(shoppingList, addIngr);
                        // if yes, error message
                        // check if already in fridge
                        var idxSL = await indexMatch(shoppingList, addIngr);
                        // if yes, error message
                        // if not in either
                        var data = await addIngredient(username, addIngr);
                        localStorage.setItem('user',
                            JSON.stringify(data));
                        setAddIngr("");
                        setShoppingList(shoppingList => [...shoppingList, addIngr]);
                        console.log("added")
                        console.log(shoppingList)
                        
                    }}
                >Enter</Button>
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
                                                    JSON.stringify(data));
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

async function addIngredient(username, item) {
    //try {
        console.log(item);
        const res = await fetch('/api/addShoppingListItem', {
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
        console.log(data);
        return data;
    //} catch (error) {
    //    res.json(error);
    //    return res.status(405).end();
    //}
}

async function indexMatch(array, q) {
    //console.log(array);
    return array ? array.findIndex(item => q.toUpperCase() === item.toUpperCase()) : -1;
}

// export async function getServerSideProps() {
//     try {
//         console.log("ss for shopping list")

//         const client = await clientPromise;
//         const db = client.db("test");

//         const ingredients = await db
//             .collection("ingredients")
//             .find({})
//             .toArray();
//         // console.log(ingredients)
//         return {
//             props: {ingredients: JSON.parse(JSON.stringify(ingredients))},
//         };
//     }
//     catch (e) {
//         console.error(e);
//     }
    
// }



