import Navbar from './navbar.js'
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { friendCard } from '../components/friend-card';
import clientPromise from '../lib/mongodb_client';
import ForumIcon from '@mui/icons-material/Forum';
import { friendShared } from '../components/friend-shared-card.js';
import RecipeCard from '../components/recipe-card';

export default function SharingPage( {friend, besties, sentRecipes, receivedRecipes} ) {
    var friendsList = besties;
    var currFriend = friend;
    var currUsername = "";
    var currUserDisplay = "";

    if (currFriend == null) {
        currUsername = "Select a friend"
    } else {
        currUsername = "Currently viewing: " + currFriend.username;
        currUserDisplay = currFriend.username;
    }

    const [value, setValue] = React.useState(0);
    const router = useRouter();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [username, setUsername] = useState("");
    
    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getUsername: {
                get() {
                    return this.username
                },
            },
            
        });
        setUsername(thisUser.getUsername);
    }, []);

    return (
        <div>
            <div>
                <Navbar /> 
            </div>
            <Grid container spacing={5.5}>
              <Grid xs={3}>
                <Box sx={{width: '100%', marginBottom: 4}}>
                    <h3 className="h3"> Friends </h3>
                    <h4 className="h3"> {currUsername} </h4>

                    <Divider />
                    {displayFriends(friendsList)}
                </Box>
              </Grid>
              <Grid xs={4.5}>
                <h3 className="h3"> Recipes received </h3>
                <Divider />
                        
                    <Grid container spacing={1}>
                    
                    {displayReceived(receivedRecipes, currUserDisplay)}
                </Grid>
              </Grid>
              <Grid xs={4.5}>
                <h3 className="h3"> Recipes sent </h3>
                <Divider />
                    <Grid container spacing={1}>
                        {displaySent(sentRecipes, currUserDisplay)}
                    </Grid>
              </Grid>
            </Grid>
        </div>
    );

    function displayReceived(recipeList, username) {
        if (username == "") {
            return (<>Select a friend to view your received recipes</>)
        }
        console.log(username)
        if (recipeList.length == 0) {
            return (<>You have not received any recipes from {username}</>)
        } else {
            return (
                recipeList.map((recipe) => (                
                    <Grid item key={recipe._id}>
                        <RecipeCard recipe={recipe}/>
                    </Grid>
                ))
            )
        }
    }

    function displaySent(recipeList, username) {
        if (username == "") {
            return (<>Select a friend to view your sent recipes</>)
        }
        if (recipeList.length == 0) {
            return (<>You have not sent any recipes to {username}</>)
        } else {
            return (
                recipeList.map((recipe) => (                
                    <Grid item key={recipe._id}>
                        <RecipeCard recipe={recipe}/>
                    </Grid>
                ))
            )
        }
    }

    function displayFriends(friendsList) {
      if (friendsList.length == 0) {
          return(<>You have no friends :(</>);
      } else {
          return (
              friendsList.map((friend) => (
                  friendShared(friend)
              ))
          );
      }
  }
}

export async function getServerSideProps(context) {
    try {
        const client = await clientPromise;
        const db = client.db("test");
      
        const user = await db
            .collection("users")
            .find({username: context.query.username}).toArray();

        var friends = user[0].friends;

        const friendObjects = new Array(friends.length);
        var i = 0;
        for (i; i < friends.length; i++) {
            var f = await db
                .collection("users")
                .find({username: friends[i]}).toArray();
            friendObjects[i] = JSON.parse(JSON.stringify(f[0]));
        }

        const currFriend = await db
            .collection("users")
            .findOne({username: context.query.friendusername});

        var sentShares = await db
            .collection("shares")
            .find({sender: context.query.username, receiver: context.query.friendusername}).toArray();

        var receivedShares = await db
            .collection("shares")
            .find({receiver: context.query.username, sender: context.query.friendusername}).toArray();
        
        
        const sentRecipes = []
        var i = 0;
        for (i; i < sentShares.length; i++) {
            var currRecipe = await db
                .collection("recipes")
                .findOne({_id: sentShares[i].recipeID})
            sentRecipes.push(currRecipe)
        }

        const receivedRecipes = []
        var i = 0;
        for (i; i < receivedShares.length; i++) {
            var currRecipe = await db
                .collection("recipes")
                .findOne({_id: receivedShares[i].recipeID})
            receivedRecipes.push(currRecipe)
        }                
      
        return {
            props: {friend: JSON.parse(JSON.stringify(currFriend)), besties: friendObjects, sentRecipes: JSON.parse(JSON.stringify(sentRecipes)), receivedRecipes: JSON.parse(JSON.stringify(receivedRecipes))},
        };
    }
    catch (e) {
        console.error(e);
    }
}