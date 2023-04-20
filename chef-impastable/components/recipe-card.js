import {Card, CardHeader, CardContent, CardMedia} from "@mui/material";
import {CardActionArea, CardActions, IconButton} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SendIcon from '@mui/icons-material/Send';
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Link } from "@mui/material";
import { Favorite, HouseOutlined } from "@mui/icons-material";
import React from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import withRouter from "next/router";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from "react";
import { friendCard } from '../components/friend-card.js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CommentIcon from '@mui/icons-material/Comment';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';

function RecipeCard( props ) {
    //https://nextjs.org/docs/api-reference/next/link
    //https://stackoverflow.com/questions/55182529/next-js-router-push-with-state
    const router = useRouter();
    // const [isSaved, setSaved] = useState(false);

    const [open, setOpen] = React.useState(false);

    const [mealPlanOpen, setMealPlanOpen] = React.useState(false);  // dialog for choosing a meal plan
    var [chosenMealPlan, setChosenMealPlan] = React.useState("");   // which meal plan was clicked

    const [newMealPlanOpen, setNewMealPlanOpen] = React.useState(false); // dialog for creating new meal plan
    var [newMealPlanName, setNewMealPlanName] = React.useState(""); // text field for new meal plan name

    const [dayOpen, setDayOpen] = React.useState(false);    // dialog for choosing day of week of meal plan

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMealPlanOpen = () => {
        setMealPlanOpen(true);
    };

    const handleMealPlanClose = () => {
        setMealPlanOpen(false);
    };

    const handleNewMealPlanOpen = () => {
        setNewMealPlanOpen(true);
    };

    const handleNewMealPlanClose = () => {
        setNewMealPlanOpen(false);
    }

    const handleNewMealPlanName = e => {
        setNewMealPlanName(e.target.value);
    }

    const handleChooseMealPlan = (value) => {
        setChosenMealPlan(value);
        setDayOpen(true);
    }

    const handleDayClose = () => {
        setDayOpen(false);
    };


    const [username, setUsername] = useState("");
    var [friends, setFriends] = useState([]);
    var [mealPlans, setMealPlans] = useState([]);

    var [sendList, setSendList] = useState([]);

    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getUsername: {
                get() {
                    return this.username
                },
            },
            getFriends: {
                get() {
                    return this.friends
                },
            },
            getMealPlans: {
                get() {
                    return this.mealPlans
                },
            }
        });
        setUsername(thisUser.getUsername);
        setFriends(thisUser.getFriends);
        setMealPlans(thisUser.getMealPlans);
    }, [mealPlans]);

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    return (
        <Card sx={{width:200}} variant="outlined">
            <CardActionArea data-test={`Recipe-${props.index}`} onClick={() => {Router.push({pathname:"/recipe-view/", query: {id: props.recipe._id, username: JSON.parse(localStorage.getItem("user")).username }})}}>
                <CardHeader title={props.recipe.title} sx={{fontSize:10}}>
                </CardHeader>
                
                <CardMedia>
                    <img src={props.recipe.image} alt="image of {props.recipe.title}" width={300}/> 
                </CardMedia>           
                <CardContent sx={{overflow: "auto"}}>
                    {props.recipe.description}
                </CardContent>
            </CardActionArea>
        <CardActions>
            <IconButton data-test={`SaveRecipe-${props.index}`}
                onClick={() => {props.onSave()}}
            > 
                {props.onSave ? 
                    props.recipe.saved 
                    ? 
                        <Favorite/>
                    : <FavoriteBorderOutlinedIcon/>
                : <></>}
            </IconButton>

            {/* Add to meal plan button */}
            <IconButton
                onClick={handleMealPlanOpen}
            >
                <PostAddIcon />
            </IconButton>

            { /* Share button */ }
            <IconButton
                onClick={handleClickOpen}>
                <SendIcon />
            </IconButton>
            <IconButton>
                <HouseOutlined 
                    onClick={() => {debugger; props.onSaveHouse()}}
                />
            </IconButton>


            {/* Choose meal plan dialog */}
            <Dialog
                open={mealPlanOpen}
                onClose={handleMealPlanClose}
            >
                <Box sx={{backgroundColor: "orange"}}>
                    <DialogTitle textAlign={"center"}>Choose Meal Plan</DialogTitle>
                </Box>
                <List sx={{ pt: 0 }}>
                    {/* Displaying meal plans */}
                    {mealPlans && mealPlans.map((mealPlan) => (
                        <ListItem disableGutters>
                            <ListItemButton onClick={() => handleChooseMealPlan(mealPlan)} key={mealPlan}>
                                <ListItemText primary={mealPlan} sx={{textAlign: "center"}}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                    { /* Create new meal plan button */ }
                    <ListItem disableGutters>
                        <ListItemButton
                            autoFocus
                            onClick={handleNewMealPlanOpen}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{backgroundColor: "orange"}}>
                                    <AddIcon sx={{color: "black"}}/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Create New Meal Plan" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Dialog>

            {/* Create new meal plan dialog */}
            <Dialog
                open={newMealPlanOpen}
                onClose={handleNewMealPlanClose}
            >
                <DialogTitle>Create New Meal Plan</DialogTitle>
                <DialogContent>
                    <Box sx={{width: 300}}>
                        <TextField
                            required
                            id="standard-required"
                            label="Name of Meal Plan"
                            variant="standard"
                            fullWidth
                            value={newMealPlanName}
                            onChange={handleNewMealPlanName}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button sx={{color: "gray"}} onClick={handleNewMealPlanClose}>Cancel</Button>
                    <Button 
                        sx={{color: "black"}}
                        onClick={async () => {
                            var data = await createMealPlan(username, newMealPlanName);
                            var user = await addMealPlanToUser(username, data.name);
                            setMealPlans(user.mealPlans);
                            setNewMealPlanOpen(false);
                            setNewMealPlanName("");
                            localStorage.setItem('user', JSON.stringify(user));
                        }}
                    >Create</Button>
                </DialogActions>
            </Dialog>
            
            {/* Choose day of week dialog */}
            <Dialog
                open={dayOpen}
                onClose={handleDayClose}
            >
                <Box sx={{width: 300}}>
                    <Box sx={{backgroundColor: "orange"}}>
                    <DialogTitle>{chosenMealPlan}</DialogTitle>
                    </Box>
                    <DialogTitle>Add {props.recipe.title} to: </DialogTitle>
                    <List>
                        {daysOfWeek.map((day) => (
                            <ListItem disableGutters>
                                <ListItemButton onClick={async () => {
                                    var mealPlan = await addRecipeToMealPlan(username, chosenMealPlan, day, props.recipe._id);
                                    setDayOpen(false);
                                    setMealPlanOpen(false);
                                    setChosenMealPlan("");
                                    setDayOpen("");
                                }}>
                                    <ListItemText primary={day} sx={{textAlign: "center"}}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Dialog>

            {/* Share dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="share-recipe">
                    {"Share this recipe"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="share-recipe-description">
                        Select friends:
                        {displayFriends(friends)}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={ async () => {
                            console.log(sendList)
                            var i = 0;
                            for (i; i < sendList.length; i++) {
                                var share = await createShare(props.recipe._id, username, sendList[i])
                            }
                            router.reload();
                        }}
                        > 
                        Send
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
    </CardActions>
    </Card>
    );

    function displayFriends(friendsList) {
        const [checked, setChecked] = React.useState([0]);

        const handleToggle = (value) => () => {
            const currentIndex = checked.indexOf(value);
            const newChecked = [...checked];

            if (currentIndex === -1) {
                newChecked.push(value);
            } else {
                newChecked.splice(currentIndex, 1);
            }

            setChecked(newChecked);
        };

        var j = 0;
        sendList = []
        for (j; j < checked.length; j++) {
            sendList.push(friendsList[checked[j]])
        }

        
        if (friendsList.length == 0) {
            return(<>You have no friends :(</>);
        } else {
            var friendListLength = new Array; 
            var i = 0;
            for (i; i < friendsList.length; i++) {
                friendListLength.push(i);
            }
            return (
                <List sx={{ width: '100%', maxWidth: 360, maxHeight: 200, bgcolor: 'background.paper' }}>
                {friendListLength.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
            
                    return (
                    <ListItem
                        key={value}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                        <ListItemIcon>
                            <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${friendsList[value]}`} />
                        </ListItemButton>
                    </ListItem>
                    );
                })}
                </List>
            );
        }
    }

    async function createShare(recipeID, sender, receiver) {
        const res = await fetch('api/createShare', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipeID: recipeID,
                sender: sender,
                receiver: receiver,
            })
        });
        const data = await res.json();
        console.log(data);
        return data;
    }

    async function createMealPlan(username, mealPlanName) {
        try {
            const res = await fetch('/api/createMealPlan', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: mealPlanName,
                    user: username
                })
            })
            const data = await res.json();
            return data;
        }
        catch (error) {
            return error;
        }
    }

    async function addMealPlanToUser(username, mealPlanName) {
        try {
            const res = await fetch('/api/addMealPlanToUser', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: mealPlanName,
                    user: username
                })
            })
            const data = await res.json();
            return data;
        }
        catch (error) {
            return error;
        }
    }

    async function addRecipeToMealPlan(username, mealPlan, day, recipeID) {
        try {
            const res = await fetch('/api/addRecipeToMealPlan', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    mealPlan: mealPlan,
                    day: day,
                    recipeID: recipeID
                })
            })
            const data = await res.json();
            return data;
        }
        catch (error) {
            return error;
        }
    }
}

export default RecipeCard;