import Navbar from './navbar.js'
import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { friendCardTwo } from '../components/friend-card-2.js';
import { addFriendCard } from '../components/add-friend-card.js';
import clientPromise from '../lib/mongodb_client';
import { useRouter } from "next/router";

export default function FriendsPage({besties}) {
    var friendsList = besties;

    const [searchValue, setSearchValue] = useState("");
    var [foundUser, setfoundUser] = useState("");
    var [foundUserDis, setfoundUserDis] = useState("");

    const [username, setUsername] = useState("");

    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getUsername: {
                get() {
                    return this.username
                },
            }
        });
        setUsername(thisUser.getUsername);
    }, []);

    const handleGetUserName = e => {
      setSearchValue(e.target.value)
    }

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
                            var thisFoundUser = await findUser(searchValue);
                            var thisFoundUserDis = await findUserDisplay(searchValue);
                            if (thisFoundUser == null && thisFoundUserDis == null) {
                                setfoundUser(null);
                            }
                            else if (!thisFoundUser.success && !thisFoundUserDis.success) {
                                setfoundUser(thisFoundUser);
                            } else {
                                if (thisFoundUser.success) {
                                    setfoundUser(thisFoundUser);
                                }
                                if (thisFoundUserDis.success) {
                                    setfoundUser(thisFoundUserDis);
                                }
                            }
                        }}
                    >
                        Search
                    </Button>
                    {<Grid container spacing={4} direction = "row">
                        {displayUsers(foundUser, username)}
                    </Grid>}
                </Grid>
                <Grid xs={6}>
                    <Box sx={{width: '100%', marginBottom: 4}}>
                        <h3 className="h3">Friends List</h3>
                        <Divider />
                        {displayFriends(friendsList)}
                    </Box>
                </Grid>
            </Grid>
        </div>
    );

    // searches for a user by username
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

    // searches for a user by display name
    async function findUserDisplay(displayName) {
        if (displayName.length == 0) {
            return null;
        } 

        const res = await fetch('/api/finduserdisplay', {
            method: 'POST', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              displayName: displayName,
            })
        })
        const data = await res.json();
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
}

function displayUsers(searchedUser, username) {
    // determines if search bar is empty
    if (searchedUser == null || searchedUser.length == 0) {
        return (<>Please Search For User <br></br></>);
    } else {
        // determines if any user was found
        if (!searchedUser.success) {
            return (<>No results<br></br></>)
        }
    }
    // user was found, displaying
    return addFriendCard(searchedUser, username);
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

