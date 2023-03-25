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
    var currUsername = ""

    if (currFriend == null) {
        currUsername = "All Shared Recipes"
    } else {
        currUsername = currFriend.username;

    }

    // // have to go through each sent share, get the recipe id, find the recipe object with api, add them all to an array called sentRecipes
    // var i = 0;
    // var sentRecipeIDS = [];
    // for (i; i < sentShares.length; i++) {
    //     // get all the shares that are sent to the currFriend
    //     // all shared recipes
    //     if (currFriend == null)  {
    //         sentRecipeIDS.push(sentShares[i].recipeID)
    //     } else {
    //         // only recurn shares that the receiver is current friend
    //         // go through each recipeID and get the recipe object later.
    //         if (sentShares[i].receiver == currUsername) {
    //             sentRecipeIDS.push(sentShares[i].recipeID)
    //         }
    //     }
    // }
    // console.log(sentRecipeIDS)

    // // go through all received shares, get recipe id, find the recipe object with api, add them all to an array called receivedRecipes
    // var j = 0;
    // var receivedRecipeIDS = [];
    // for (j; j < receivedShares.length; j++) {
    //     // go through all recipeID and get recipe object later.
    //     if (currFriend == null)  {
    //         receivedRecipeIDS.push(receivedShares[j].recipeID)
    //     } else {
    //         if (receivedShares[i].sender == currUsername) {
    //             receivedRecipeIDS.push(receivedShares[j].recipeID)
    //         }
    //     }
    // }
    // console.log(receivedRecipeIDS)

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
                    <h4 className="h3"> Currently Viewing: {currUsername} </h4>

                    <Divider />
                    {displayFriends(friendsList)}
                </Box>
              </Grid>
              <Grid xs={4.5}>
                <h3 className="h3"> Recipes received </h3>
                <Divider />
                        
                    <Grid container spacing={1}>
                    
                    {displayReceived(receivedRecipes)}
                </Grid>
              </Grid>
              <Grid xs={4.5}>
                <h3 className="h3"> Recipes sent </h3>
                <Divider />
                    <Grid container spacing={1}>
                        {displaySent(sentRecipes)}
                    </Grid>
              </Grid>
            </Grid>
        </div>
    );

    function displayReceived(recipeList) {
        if (recipeList.length == 0) {
            return (<>You have not received any recipes</>)
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

    function displaySent(recipeList) {
        if (recipeList.length == 0) {
            return (<>You have not sent any recipes</>)
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

        var sentShares;
        var receivedShares;
        if (currFriend == null) {
            sentShares = await db
                .collection("shares")
                .find({sender: context.query.username}).toArray();

            receivedShares = await db
                .collection("shares")
                .find({receiver: context.query.username}).toArray();

        } else {
            sentShares = await db
                .collection("shares")
                .find({sender: context.query.username, receiver: context.query.friendusername}).toArray();

            receivedShares = await db
                .collection("shares")
                .find({receiver: context.query.username, sender: context.query.friendusername}).toArray();
            }
        
        const sentRecipes = []
        var i = 0;
        for (i; i < sentShares.length; i++) {
            var currRecipe = await db
                .collection("recipes")
                .findOne({_id: sentShares[i].recipeID})
            sentRecipes.push(currRecipe)
        }
        console.log(sentRecipes.length)

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