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

export default function ShoppingListEdit() {

    const [username, setUsername] = useState("");
    const [shoppingList, setShoppingList] = useState("");
    const [fridge, setFridge] = useState([]);
    const [addIngr, setAddIngr] = useState("");

    const [ingrArr, setIngrArr] = useState([])
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
        async function getIngredients() {
            var i = await getIngr();
            setIngrArr(i.map((igr => igr.ingredient)))
        }
        getIngredients();
    }, []);

    // for autocomplete search bar
    const [ingrArr2, setIngrArr2] = useState(ingrArr);
    useEffect(() => {
        setIngrArr2(ingrArr.filter(ing => shoppingList ? (!fridge.includes(ing.toLowerCase()) && !shoppingList.includes(ing.toLowerCase())) : true))
        //console.log(ingrArr2)
    })

    // for messages
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    // unassigned
    const [openS, setOpenS] = useState(false);
    const handleClickOpenS = () => {setOpenS(true);};
    const handleCloseS = () => {setOpenS(false);};

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
                <Autocomplete
                    disablePortal
                    freeSolo
                    id="for-search"
                    options={ingrArr2}
                    onInputChange={(e, new_val) => {console.log(new_val); setAddIngr(new_val)}}
                    renderInput={params => (
                        <TextField 
                        {...params}
                        label="Search for Item" id="Search Bar" 
                        sx={{width: 300}}
                        onChange={({ target }) => setAddIngr(target.value)}
                        />
                    )}
                />
                <Button
                    // Add Button
                    data-test='AddItem'
                    type="submit" 
                    size="large" 
                    variant="contained"
                    sx={{width: 110}}
                    onClick={async () => {
                        // check if already in shopping list
                        var idxSL = await indexMatch(shoppingList, addIngr);
                        if (idxSL == -1) {
                            // item not found in shopping list
                            // check if already in fridge
                            var idxF = await indexMatch(fridge, addIngr);
                            if (idxF == -1) {
                                // item not found in fridge
                                var data = await addIngredient(username, addIngr);
                                localStorage.setItem('user', JSON.stringify(data));
                                setShoppingList(shoppingList => [...shoppingList, addIngr]);
                                setAddIngr("");
                                console.log("added")
                                console.log(shoppingList)
                                // confirmation popup? can tell if added
                            } else {
                                // item already owned in fridge, error message?
                            }
                        } else {
                            // item already in list, error message?
                        }
                    }}
                >
                    Add
                </Button>
                <Button
                    // CLEAR button
                    data-test='ClearItem'
                    type="submit" 
                    size="large" 
                    variant="outlined"
                    color="error"
                    startIcon={<ClearIcon/>}
                    sx={{width: 110}}
                    onClick={async () => {
                        setShoppingList([]);
                        var data = await ClearList(username);
                        localStorage.setItem('user', JSON.stringify(data));
                        //console.log("shopping list cleared"+ shoppingList)
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
                {shoppingList && shoppingList.map((item, index) => (
                    <Box>
                        <FormGroup row>
                        </FormGroup>
                        <Grid container id="Item">
                            <Grid>
                                <List data-test={`ListItem-${index}`}>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" data-test="DeleteButton"
                                            onClick={async () => {
                                                deleteByIndex(index);
                                                var data = await DeleteListItem(username, item);
                                                //console.log(localStorage.getItem('user'))
                                                localStorage.setItem('user', JSON.stringify(data));
                                                //console.log("item deleted" + shoppingList);
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
        <div>
            {/* confirmation popup */}
            <Dialog
                fullScreen={fullScreen}
                open={openS}
                onClose={handleCloseS}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Success"}
                </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            The ingredient was successfully added!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseS} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
            </Dialog>
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
        console.error(e);
    }
}

async function ClearList(username) {
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

async function getIngr() {
    const res = await fetch('/api/getIngrDatabase', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            //user: user_id,
            getData: true,
        })
    })
    const data = await res.json();
    console.log(data);
    return data;
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


// function displayList(shoppingList) {
//     if (shoppingList.length > 0) {
//         return (
//             <Grid>
//             {shoppingList && shoppingList.map((item, index) => (
//                 <Box>
//                     <FormGroup row>
//                     </FormGroup>
//                     <Grid container>
//                         <Grid>
//                             <List>
//                                 <ListItem
//                                     secondaryAction={
//                                         <IconButton edge="end" aria-label="delete" 
//                                         onClick={async () => {
//                                             deleteByIndex(index);
//                                             var data = await DeleteListItem(username, item);
//                                             console.log(localStorage.getItem('user'))
//                                             localStorage.setItem('user', JSON.stringify(data));
//                                             console.log(localStorage.getItem('user'));
//                                         }}
//                                         >
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     }
//                                 >
//                                     <ListItemText
//                                         sx={{display: 'flex', justifyContent: 'center'}}
//                                         primary={item}
//                                     />
//                                 </ListItem>
//                             </List>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             ))}
//             </Grid>
//         );
//     } else {
//         return (<>Shopping List Empty</>);
//     }
// }

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



