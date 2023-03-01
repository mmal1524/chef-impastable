import Navbar from './navbar.js'
import * as React from 'react';
import User from '../components/user';
import { currUser } from '../components/user';
import { useState, useEffect } from "react";
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useRef } from 'react';
import { friendCardTwo } from '../components/friend-card-2.js';
import { addFriendCard } from '../components/add-friend-card.js';
import clientPromise from '../lib/mongodb_client';

// edge cases to consider: adding myself, adding friends already in my friend list, inputing invalid user, 


export default function FriendsPage({besties}) {
    //console.log(users)
    var friendsList = besties;

    const [searchValue, setSearchValue] = useState("");
    var [foundUser, setfoundUser] = useState("");
    
    // don't need a router, need to have a list of users come up

    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState("");
    var [createdPrivacy, setCreatedPrivacy] = useState("");
    var [savedPrivacy, setSavedPrivacy] = useState("");
    var [reviewedPrivacy, setReviewedPrivacy] = useState("");
    var [mealPlanPrivacy, setMealPlanPrivacy] = useState("");

    useEffect(() => {
      var thisUser = JSON.parse(localStorage.getItem('user'));
      Object.defineProperties(thisUser, {
          getUsername: {
              get() {
                  return this.username
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
          }
      });
      setUsername(thisUser.getUsername);
      setDisplayName(thisUser.getDisplayName);
      setAvatar(thisUser.getAvatar);
      setFriends(thisUser.getFriends);
      setFriendRequests(thisUser.getFriendRequests);
      setCreatedPrivacy(thisUser.getCreatedPrivacy);
      setSavedPrivacy(thisUser.getSavedPrivacy);
      setReviewedPrivacy(thisUser.getReviewedPrivacy);
      setMealPlanPrivacy(thisUser.getMealPlanPrivacy)
  }, []);

    const handleGetUserName = e => {
      setSearchValue(e.target.value)
    }

    const handleNoUser = e => {
      setDisplayU(false);
    }

    console.log("search value")
    console.log(searchValue)

    return (
        <div>
            <div>
                <Navbar /> 
            </div>
            <Grid container spacing={6}>
                <Grid xs={6}>
                <h3 className="h3">Search For Friends</h3>
                <Divider />
                <TextField
                    id="outlined-search"
                    label=""
                    //defaultValue="Search..."
                    helperText=""
                    variant="standard"
                    value={searchValue}
                    placeholder="search..."
                    onChange={handleGetUserName}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      variant='contained'
                      color='primary'
                      size='small'
                      onClick={ async () => {
                        console.log('hey');
                        console.log(searchValue);
                        var thisFoundUser = await findUser(searchValue);
                        if (thisFoundUser == null) {
                          console.log("no")
                          setfoundUser(null);
                        } else {
                          console.log(thisFoundUser);
                          setfoundUser(thisFoundUser);
                          console.log(foundUser)
                        }
                        //<Grid container spacing={3}>
                        //{user.map((searchValue) => (
                            //<Grid> item key={user.id}>
                           //</Grid>   <UserDisplay = user={user}/>
                           // </Grid>
                         //</Grid> ))}
                        //</Grid>
                       // if (foundUser.success) {

                        //  handleGetUser();
                        //} else {
                        //  <div>
                          //</div>  <p> hello </p>
                          //</div>
                          //handleNoUser(); 
                        //}
                      }}
                      >
                    Search
                    </Button>
                    {<Grid container spacing={4} direction = "row">
                        {displayUsers(foundUser)}
                    </Grid>}
                </Grid>
                <Grid xs={6}>
                    <Box sx={{width: '100%', marginBottom: 4}}>
                    <h3 className="h3">Friends List</h3>
                    <Divider />
                    {displayFriends(friendsList)}

                    {/* <Grid container spacing={4} direction = "column">
                        {<Grid container spacing = {2} direction = "row">
                            {user.friends[0].displaySmall()}
                            {<Button variant="outlined" endIcon={<DeleteIcon />}>Remove</Button>}
                            {<Button variant="outlined" endIcon={<FullscreenIcon />}>View</Button>} </Grid>}

                        {<Grid container spacing = {2} direction = "row">
                            {user.friends[1].displaySmall()}
                            {<Button variant="outlined" endIcon={<DeleteIcon />} >Remove</Button>}
                            {<Button variant="outlined" endIcon={<FullscreenIcon />}>View</Button>} </Grid>}
                        
                        {<Grid container spacing = {2} direction = "row">
                            {user.friends[2].displaySmall()}
                            {<Button variant="outlined" endIcon={<DeleteIcon />}>Remove</Button>}
                            {<Button variant="outlined" endIcon={<FullscreenIcon />}>View</Button>} </Grid>}
                    </Grid> */}
                    </Box>
                    </Grid>
            </Grid>
        </div>
    );

  async function findUser(username) {
    console.log(username.length)
    if (username.length == 0) {
        console.log("in")
        return null;
    }
    console.log("in find user")
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
    console.log(res)
    console.log("at the end of findUser")
    const data = await res.json();
    console.log('data')
    console.log(data)
    return data;
  } 

  function displayFriends(friendsList) {
    if (friendsList.length == 0) {
        return(<>You have no friends :(</>);
    } else {
        return (
            friendsList.map((friend) => (
                friendCardTwo(friend)
            ))
        );
    }
}

function displayUsers(searchedUser) {
  console.log("display")
  if (searchedUser == null) {
    return (<></>)
  }
  console.log(searchedUser.username)
  if (searchedUser.username == undefined) {
    return (<></>)
  }
  
  return addFriendCard(searchedUser);
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

