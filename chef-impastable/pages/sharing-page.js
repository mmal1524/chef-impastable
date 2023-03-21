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

export default function SharingPage( {besties} ) {
    var friendsList = besties;

    const [value, setValue] = React.useState(0);
    const router = useRouter();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState("");
    var [createdPrivacy, setCreatedPrivacy] = useState("");
    var [savedPrivacy, setSavedPrivacy] = useState("");
    var [reviewedPrivacy, setReviewedPrivacy] = useState("");
    var [mealPlanPrivacy, setMealPlanPrivacy] = useState("");
    const [fridge, setFridge] = useState([]);
    const [kitchen, setKitchen] = useState([])
    const [fridge_grouped, setFridgeGrouped] = useState({})

    
    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getUsername: {
                get() {
                    return this.username
                },
            },
            getPassword: {
                get() {
                    return this.password
                },
            },
            getDisplayName: {
                get() {
                    return this.displayName
                },
            },
            getAvatar: {
                get() {
                    return this.avatar
                },
            },
            getFriends: {
                get() {
                    return this.friends
                },
            },
            getFriendRequests: {
                get() {
                    return this.friendRequests
                },
            },
            getCreatedPrivacy: {
                get() {
                    return this.createdPrivacy
                },
            },
            getSavedPrivacy: {
                get() {
                    return this.savedPrivacy
                },
            },
            getReviewedPrivacy: {
                get() {
                    return this.reviewedPrivacy
                },
            },
            getMealPlanPrivacy: {
                get() {
                    return this.mealPlanPrivacy
                }
            },
            getFridge: {
                get() {
                    return this.fridge
                }
            },
            getKitchen: {
                get() {
                    return this.kitchen
                }
            },
            getFridgeGrouped: {
                get() {
                    return this.fridge_grouped
                }
            }
        });
        setUsername(thisUser.getUsername);
        setPassword(thisUser.getPassword);
        setDisplayName(thisUser.getDisplayName);
        setAvatar(thisUser.getAvatar);
        setFriends(thisUser.getFriends);
        setFriendRequests(thisUser.getFriendRequests);
        setCreatedPrivacy(thisUser.getCreatedPrivacy);
        setSavedPrivacy(thisUser.getSavedPrivacy);
        setReviewedPrivacy(thisUser.getReviewedPrivacy);
        setMealPlanPrivacy(thisUser.getMealPlanPrivacy)
    }, []);
    return (
        <div>
            <div>
                <Navbar /> 
            </div>
            <Grid container spacing={4}>
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

      return {
          props: {besties: friendObjects},
      };
  }
  catch (e) {
      console.error(e);
  }
}