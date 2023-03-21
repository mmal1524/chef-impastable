import {Card, CardHeader, CardContent, CardMedia} from "@mui/material";
import Image from "next/image";
import {CardActionArea, CardActions, IconButton} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SendIcon from '@mui/icons-material/Send';
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Link } from "@mui/material";
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



function RecipeCard( props ) {
    //https://nextjs.org/docs/api-reference/next/link
    //https://stackoverflow.com/questions/55182529/next-js-router-push-with-state
    const router = useRouter();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [username, setUsername] = useState("");
    var [friends, setFriends] = useState([]);

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
        });
        setUsername(thisUser.getUsername);
        setFriends(thisUser.getFriends);
    }, []);

    return (
        <Card sx={{width:200}} variant="outlined">
            <CardActionArea onClick={() => {Router.push({pathname:"/recipe-view/", query: {id: props.recipe._id, title: props.recipe.title, author: props.recipe.author, ingredients: props.recipe.ingredients, instructions: props.recipe.instructions_list, nutrients: props.recipe.nutrients}})}}>
                <CardHeader title={props.recipe.title} sx={{fontSize:10}}>
                </CardHeader>
                
                <CardMedia>
                    <img src={props.recipe.image} alt="image of {props.recipe.title}" width={200} /> 
                </CardMedia>           
                <CardContent sx={{overflow: "auto"}}>
                    {props.recipe.description}  
                </CardContent>
            </CardActionArea>
        <CardActions>
            <IconButton>
                <FavoriteBorderOutlinedIcon />
            </IconButton>
            <IconButton
                onClick={handleClickOpen}>
                <SendIcon />
            </IconButton>
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
                        <Button> 
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
    
}

async function findUser(username) {
    if (username.length == 0) {
        return null;
    } 

    const res = await fetch('/api/finduser', {
      method: 'POST', 
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
  } 

async function displayFriends(friendsList) {
    if (friendsList.length == 0) {
        return(<>You have no friends :(</>);
    } else {
        var friendsObjects = new Array;
        var i = 0;
        for (i; i < friendsList.length; i++) {
            var friend = await findUser(friendsList[i]);
            console.log("friend")
            console.log(friend)
            friendsObjects.push(friend)
        }
        console.log("type");
        console.log((typeof[friendsObjects]));
        return (
            friendsObjects.map((friend) => (
                friendCard(friend)
            ))
        );
    }
}

export default RecipeCard;