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
import { useRouter } from "next/router";


// edge cases to consider: adding myself, adding friends already in my friend list, inputing invalid user, 


export default function FriendsPage({besties}) {
    //console.log(users)
    var friendsList = besties;

    const [searchValue, setSearchValue] = useState("");
    var [foundUser, setfoundUser] = useState("");
    var [foundUserDis, setfoundUserDis] = useState("")
    
    // don't need a router, need to have a list of users come up

    const [username, setUsername] = useState("");
    var [displayName, setDisplayName] = useState("");
    var [avatar, setAvatar] = useState("");
    var [friends, setFriends] = useState([]);
    var [friendRequests, setFriendRequests] = useState("");
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

    console.log("search value")
    console.log(searchValue)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const router = useRouter();

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
                        var thisFoundUserDis = await findUserDisplay(searchValue);
                        console.log('this found user');
                        console.log(thisFoundUserDis);
                        console.log(await findUserDisplay(searchValue))
                        console.log("up")
                        
                        if (thisFoundUser == null) {
                          console.log("no")
                          setfoundUser(null);
                        } else {
                            setfoundUser(thisFoundUser);
                        }
                        if (thisFoundUserDis === null) {
                            setfoundUserDis(null);
                        } else {
                            setfoundUserDis(thisFoundUserDis);
                        }
                        
                        if (JSON.stringify(thisFoundUser) == JSON.stringify(thisFoundUserDis)) {
                            console.log("hey")
                            setfoundUser(thisFoundUser);
                            setfoundUserDis(null)
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
                        {displayUsers(foundUser, username)}
                        {displayUsersDis(foundUserDis, username)}
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
    //var nullCheck = await fetch('api/finduser')
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

  async function findUserDisplay(displayName) {
    //var nullCheck = await fetch('api/finduserdisplay')
    console.log(displayName.length)
    if (displayName.length == 0) {
        console.log("in")
        return null;
    } 

    console.log("in find user")
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

// function displayUserDecider(usernameUser, displayUser) {
//     if (usernameUser == displayUser) {
//         return(displayUsers(usernameUser));
//     } else {
//         displayUsers(usernameUser);
//         displayUsersDis(displayUser);
//     }
// }

function displayUsers(searchedUser, username) {
  console.log("display")
  {<>Please Enter A Username</>}
  if (searchedUser == null) {
    return (<>Please Search For User <br></br></>)
  }
  console.log(searchedUser.username)
  if (searchedUser.username == undefined) {
    return (<>No User Found With Username <br></br></>)
  }
  
  return addFriendCard(searchedUser, username);
}

function displayUsersDis(searchedUserDis, username) {
    console.log(searchedUserDis)
    {<>Please Enter A DisplayName</>}

    if (searchedUserDis == null) {
      return (<></>)
    }

    if (searchedUserDis.displayName == undefined) {
      return (<>No User Found With Display Name</>)
    }
    console.log(searchedUserDis)
    
    return (<>{addFriendCard(searchedUserDis, username)}</>);
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

