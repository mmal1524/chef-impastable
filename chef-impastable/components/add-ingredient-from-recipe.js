import * as React from "react";
import { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Grid, Box, FormGroup, List, ListItemText, Button, Typography} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function AddToListDialog(props) {
    //console.log(props)
    //console.log(props.recipe.ingredients)
    const ingrArr = props.recipe.ingredients.map(a => a.ingredient);
    console.log("ingrArr: " + ingrArr)
    const [username, setUsername] = useState("");
    const [shoppingList, setShoppingList] = useState("");
    const [fridge, setFridge] = useState([]);
    var toAdd = [];
    //console.log(toAdd)
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
    }, []);

    console.log("shopping list:"+ shoppingList)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    //const [smthToAdd, setSmthToAdd] = useState(false);
    function indexMatch(array, q) {
        //console.log(array);
        return array ? array.findIndex(item => q.toUpperCase() === item.toUpperCase()) : -1;
    }
    for (let i = 0; i < ingrArr.length; i++) {
        // check if already in shopping list or fridge(for all items)
        var idxSL = indexMatch(shoppingList, ingrArr[i]);
        var idxF = indexMatch(fridge, ingrArr[i]);
        if (idxSL == -1 && idxF == -1) {
            // not found in list, not owned
            //setSmthToAdd(true);
            toAdd[i] = 1;
        } else {
            // found in list, owned
            toAdd[i] = 0;
            //console.log("toadd" + toAdd[i])
        }
    }
    //const disabled = useState(smthToAdd);

    //console.log(toAdd)

    const closeAction = () => {
        props.onClose();
    }

    const handleAddToList = async () => {
        for (let j = 0; j < ingrArr.length; j++) {
            if (toAdd[j] == 1) {
                toAdd[j] = null;
                var data = await addIngredient(username, ingrArr[j]);
                setShoppingList(shoppingList => [...shoppingList, ingrArr[j]]);
                localStorage.setItem('user', JSON.stringify(data));
            }
        }

        console.log("shoppinglist after add" + shoppingList)
        closeAction();
    }

    return(
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            fullWidth={true}
            maxWidth={'sm'}

            onClose={props.onClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle>
                {"Add to Shopping List:"}
            </DialogTitle>
            <DialogContent>
                <Grid>
                    <Typography>Green items will be added to your shopping list.</Typography>
                    <Typography>Red items are already owned or on the list.</Typography>
                    {ingrArr && ingrArr.map((item, index) => (
                        <Box>
                            <FormGroup row>
                            </FormGroup>
                            <Grid container>
                                <Grid
                                    sx={{backgroundColor: toAdd[index] === 1 ? 'lightgreen' : 'pink',}}
                                >
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
            </DialogContent>
            <DialogActions>
                <Button onClick={closeAction}>
                    Cancel
                </Button>
                <Button 
                    //disabled={disabled}
                    onClick={async() => {
                        console.log("clicked")
                        await handleAddToList();
                    }}
                >
                    Confirm.
                </Button>
            </DialogActions>
        </Dialog>
    );
    
}

async function addIngredient(username, item) {
    try {
        //console.log(item);
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
    } catch (error) {
        console.log("error")
    //    res.json(error);
    //    return res.status(405).end();
    }
}
