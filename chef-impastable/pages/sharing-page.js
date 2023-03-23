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

export default function SharingPage( {besties, sentShares, receivedShares} ) {
    var friendsList = besties;

    // have to go through each sent share, get the recipe id, find the recipe object with api, add them all to an array called sentRecipes
    var i = 0;
    var sentRecipeIDS = [];
    for (i; i < sentShares.length; i++) {
        // go through each recipeID and get the recipe object later.
        sentRecipeIDS.push(sentShares[i].recipeID)
    }
    console.log(sentRecipeIDS)

    // go through all received shares, get recipe id, find the recipe object with api, add them all to an array called receivedRecipes
    var j = 0;
    var receivedRecipeIDS = [];
    for (j; j < receivedShares.length; j++) {
        // go through all recipeID and get recipe object later.
        receivedRecipeIDS.push(receivedShares[j].recipeID)
    }
    console.log(receivedRecipeIDS)

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
                    <Divider />
                    {displayFriends(friendsList)}
                </Box>
              </Grid>
              <Grid xs={4.5}>
                <h3 className="h3"> Recipes recieved </h3>
                <Divider />
                    {<Grid container spacing={4} direction = "row">
                    {/* <Grid container spacing={1}>
                    
                    {recipes.map((recipe) => (                
                        <Grid item key={recipe._id}>
                            <RecipeCard recipe={recipe}/>
                        </Grid>
                    )
                        
                    )}
                </Grid> */}
                    </Grid>}
              </Grid>
              <Grid xs={4.5}>
                <h3 className="h3"> Recipes sent </h3>
                <Divider />
                    {<Grid container spacing={4} direction = "row">
                    </Grid>}
              </Grid>
            </Grid>
        </div>
    );

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

  async function findRecipe(recipeID) {
    //var nullCheck = await fetch('api/get_recipe_by_id')

    const res = await fetch('/api/get_recipe_by_id', {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipeID: recipeID,
      })
    })
    console.log(res)
    const data = await res.json();
    console.log('data')
    console.log(data)
    return data;
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

      const sentShares = await db
            .collection("shares")
            .find({sender: context.query.username}).toArray();

    const receivedShares = await db
            .collection("shares")
            .find({receiver: context.query.username}).toArray();
      
      return {
          props: {besties: friendObjects, sentShares: JSON.parse(JSON.stringify(sentShares)), receivedShares: JSON.parse(JSON.stringify(receivedShares))},
      };
  }
  catch (e) {
      console.error(e);
  }
}