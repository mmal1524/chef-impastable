import * as React from "react";
import { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Grid, Box, FormGroup, List, ListItemText, Button, Typography, FormControlLabel} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

export default function AddToListDialog(props) {
    //console.log(props)
    //console.log(props.recipe.ingredients)
    const recipeArr = props.recipeObjArr;
    //console.log(recipeArr);
    const [ingrArr, setIngrArr] = useState([]);
    const [username, setUsername] = useState("");
    const [shoppingList, setShoppingList] = useState("");
    const [fridge, setFridge] = useState([]);
    const [excludeFridgeItems, setExcludeFridge] = useState(true);
    const handleSwitch = () => {
        if (excludeFridgeItems == true) {
            setExcludeFridge(false);
        } else {
            setExcludeFridge(true);
        }
    }
    var toAdd = [];
    const [update, setUpdate] = useState(0);
    const [addArr, setAddArr] = useState([]);
    const [smthToAdd, setSmth] = useState(false);
    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
        console.log(thisUser)
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
        //debugger;
        if (arrayEq(thisUser.getShoppingList, shoppingList) == false) {
            console.log("not equal");
            setUpdate(update + 1);
        }
        setShoppingList(thisUser.getShoppingList);
        setUsername(thisUser.getUsername);
        setFridge(thisUser.getFridge);
        handleCreateIngrList();
        handleMakeToAdd();
        console.log("addARR",addArr);

        if (props.open == false) {
            setExcludeFridge(true)
        }
    }, [props, excludeFridgeItems, update]);

    // console.log("shopping list:", shoppingList)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleCreateIngrList = async () => {
        while (ingrArr.length > 0) {
            ingrArr.pop();
        }
        for (let i = 0; i < recipeArr.length; i++) {
            var ingredient = recipeArr[i].ingredients.map(a => a.ingredient);
            console.log(ingredient);
            for (let j = 0; j < ingredient.length; j++) {
                var idx = indexMatch(ingrArr, ingredient[j]);
                if (idx == -1 && ingredient[j] != "\n") {
                    // only add if ingredient no already in the list
                    ingrArr.push(ingredient[j]);
                }
            }
        }
    }

    function indexMatch(array, q) {
        return array ? array.findIndex(item => q.toUpperCase() === item.toUpperCase()) : -1;
    }
    const handleMakeToAdd = async () => {
        while (addArr.length > 0) {
            addArr.pop();
        }
        setSmth(false);
        for (let i = 0; i < ingrArr.length; i++) {
            // check if already in shopping list or fridge(for all items)
            var idxSL = indexMatch(shoppingList, ingrArr[i]);
            var idxF = indexMatch(fridge, ingrArr[i]);
            if (idxSL == -1 && idxF == -1) {
                // not found in list, not owned
                addArr.push(1);
                setSmth(true);
            } else {
                // found in list, owned
                if (excludeFridgeItems == false && idxSL == -1) {
                    addArr.push(1);
                    setSmth(true);
                } else {
                    addArr.push(0);
                }
            }
        }
    }

    const closeAction = () => {
        props.onClose();
    }

    const handleAddToList = async () => {
        for (let j = 0; j < ingrArr.length; j++) {
            if (addArr[j] == 1) {
                if (addArr[j] != "\n") {
                    var data = await addIngredient(username, ingrArr[j]);
                    setShoppingList(shoppingList => [...shoppingList, ingrArr[j]]);
                    localStorage.setItem('user', JSON.stringify(data));
                }
                addArr[j] = null;
            }
        }
        closeAction();
    }

    function arrayEq (a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) {
            return false
        }
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) {
                console.log(a[i], b[i]);
                return false
            };
        }
        return true;
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
                                    sx={{backgroundColor: addArr[index] === 1 ? 'lightgreen' : 'pink',}}
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
            <DialogActions sx={{justifyContent: 'space-between',}}>
                <Grid sx={{ml: 2}}>
                    <FormGroup>
                        <FormControlLabel control={<Switch 
                            data-test='Toggle'
                            onChange={handleSwitch}
                            defaultChecked/>} label="Exclude Items Already in Fridge"/>
                    </FormGroup>
                </Grid>
                <Grid>
                    <Button onClick={closeAction}>
                        Cancel
                    </Button>
                    <Button 
                        data-test='ConfirmAddButton'
                        disabled={!smthToAdd ? true : false}
                        onClick={async() => {
                            console.log("clicked")
                            await handleAddToList();
                        }}
                    >Confirm.
                    </Button>
                </Grid>
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
