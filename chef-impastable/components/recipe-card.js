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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CommentIcon from '@mui/icons-material/Comment';

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

    const [sendList, setSendList] = useState([]);

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
                        <Button 
                            // onClick={ async () => {
                            //     var i = 0;
                            //     for (i; i < sendList.length; i++) {
                            //         console.log(sendList[i])
                            //     }
                            // }}
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
                        {console.log("here")}
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${friendsList[value]}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          );
    }

    async function createShare(recipeID, sender, reciever) {
        console.log(recipeID);
        console.log(sender);
        console.log(reciever);
        const res = await fetch('api/createShare', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipeID: recipeID,
                author: author,
                rating: rating,
                description: description
            })
        });
        const data = await res.json();
        console.log(data);
        return data;
    }
}

export default RecipeCard;