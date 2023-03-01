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

//const FriendSearch = ({ friends }) => {
//  const [searchQuery, setSearchQuery] = useState("");

//  const filteredFriends = friends.filter((friend) =>
//    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
 // );


export default function FriendsPage({users}) {
    //console.log(users)

    var friend1 = new User('Mahima', 'mahimasusername', "", [], []);
    var friend2 = new User('Jiahui', 'jiahuisusername', "", [], []);
    var friend3 = new User('Kendalyn', 'kendalynsusername', "", [], []);
    var friend4 = new User('Carmen', 'carmentsusername', "", [], []);
    var user = new User('Sarah Wagler', 'sawagler', "", [friend1, friend2, friend3], [friend4]);
    

    const [usernameValue, setUsernameValue] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [query, setQuery] = useState("")
    const [displayU, setDisplayU] = useState(false);
    const [searchUser, setSearchUser] = useState(null);
    // don't need a router, need to have a list of users come up

    const sendValue = async (e) => {
      e.preventDefault();
      const response = await fetch('/api/searchfriends');
      const data = await response.json();
      setAllUsers(data);
      return console.log("hi")
      return console.log(usernameValue.target.value);
    }

    const handleGetUserName = e => {
      setUsernameValue(e.target.value)
    }

    const handleNoUser = e => {
      setDisplayU(false);
    }

    console.log(usernameValue)

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
                    value={usernameValue}
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
                        var foundUser = await findUser(usernameValue);
                        if (!foundUser.success) {
                          console.log("no")
                        } else {
                          console.log("find")
                          console.log(foundUser)
                        }
                        //<Grid container spacing={3}>
                        //{user.map((usernameValue) => (
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
                            {user.friends[0].displaySmall()}
                            {<Button 
                              variant="outlined"
                              endIcon={<SendIcon />}>Request</Button>}
                            {<Button variant="outlined" endIcon={<FullscreenIcon />}>View</Button>} </Grid>}
                </Grid>
                <Grid xs={6}>
                    <Box sx={{width: '100%', marginBottom: 4}}>
                    <h3 className="h3">Friends List</h3>
                    <Divider />

                    <Grid container spacing={4} direction = "column">
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
                    </Grid>
                    </Box>
                    </Grid>
            </Grid>
        </div>
    );

  async function findUser(username) {
    console.log(username)
    console.log("in find user")
    const res = await fetch('/api/find-username', {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
      })
    })
    console.log("at the end of findUser")
    const data = await res.json();
    console.log('data')
    console.log(data)
    return data;
  } 
}

