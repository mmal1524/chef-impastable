import * as React from 'react';
import User, { displaySmall } from '../components/user';
//import { getInitials } from '../components/user';
import { displayLarge } from '../components/user';
import { displayFriends } from '../components/user';
//import { displaySmall } from '../components/user';
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
import Navbar from './navbar.js';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { friendCard } from '../components/friend-card';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ProfilePage() {

    const [value, setValue] = React.useState(0);
    const router = useRouter();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState("");

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
            }
        });
        setUsername(thisUser.getUsername);
        setDisplayName(thisUser.getDisplayName);
        setAvatar(thisUser.getAvatar);
        setFriends(thisUser.getFriends);
        setFriendRequests(thisUser.getFriendRequests);
    }, []);

    // console.log(friends);
    // console.log(friends.length);

    // var friendsObjects = getFriendsArray(friends).then(function(result) {
    //     console.log(result);
    //     return result;
    // });
    // console.log(friendsObjects);

    return (
        <>
            <div>
                <div className="App">
                    <Navbar />
                </div>
                <p></p>
                <Grid container spacing={6}>
                    <Grid xs={10}>
                        {/* Displaying user's profile picture, name, and username */}
                        {displayLarge(username, displayName, avatar)}
                    </Grid>
                    <Grid xs={2}>
                        {/* Edit profile button */}
                        <Button 
                            variant="outlined" 
                            startIcon={<SettingsIcon />} 
                            sx={{color: 'black', borderColor: 'black'}}
                            onClick={() => {
                                router.push("edit-profile");
                            }}
                        >
                            Edit Profile
                        </Button>
                    </Grid>
                    {/* Displays user's friends */}
                    <Grid xs={4}>
                        <Box sx={{width: '100%', marginBottom: 4}}>
                            <h3 className="h3">Friends</h3>
                            <Divider />
                            {/* {console.log(friends)}
                            {console.log(friends.length)}
                            {console.log(friendsObjects)} */}
                            {      
                                friends.map((friend) => (
                                    friendCard(friend)
                                ))
                            }
                        </Box>
                    </Grid>
                    {/* Displays user's friend requests */}
                    <Grid xs={4}>
                        <Box sx={{width: '100%', marginBottom: 4}}>
                            <h3 className="h3">Friend Requests</h3>
                            <Divider />
                            <Stack
                               direction="row"
                               justifyContent="space-between"
                               alignItems="center"
                               spacing={2}
                            >
                                This is where friend requests go
                                <Button 
                                    variant="outlined" 
                                    sx={{color: 'green', borderColor: 'green'}}
                                >
                                    Accept
                                </Button>
                            </Stack>
                        </Box>
                    </Grid>

                </Grid>



                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Created Recipes" {...a11yProps(0)} />
                            <Tab label="Saved Recipes" {...a11yProps(1)} />
                            <Tab label="Reviewed Recipes" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        Here is where created recipes will go
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Here is where saved recipes will go
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Here is where reviewed recipes will go
                    </TabPanel>
                </Box>

                <style jsx>{`
                    .displayName {
                        margin: 0px;
                    }
                    .username {
                        margin: 0px;
                    }
                    .h3 {
                        margin-bottom: 2px;
                    }
                `}</style>

            </div>
            
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
        </>
    );

    async function getFriendsArray(friends) {
        console.log(friends);
        console.log(friends.length);
        var friendsArray = [];
        console.log(friendsArray.length);
        for (var i = 0; i < friends.length; i++) {
            friendsArray.push(await findUser(friends[i]));
        }
    
        console.log(friendsArray);
        console.log(friendsArray.length);
        return friendsArray;
    
        async function findUser(username) {
            const res = await fetch('/api/finduser', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username
                })
            });
            const data = await res.json();
            return data;
        }
    }

    async function findUser(username) {
        const res = await fetch('/api/finduser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username
            })
        });
        const data = await res.json();
        return data;
    }
}

// async function getFriendsArray(friends) {
//     console.log(friends);
//     console.log(friends.length);
//     var friendsArray = [];
//     console.log(friendsArray.length);
//     for (var i = 0; i < friends.length; i++) {
//         friendsArray.push(await findUser(friends[i]));
//     }

//     console.log(friendsArray);
//     console.log(friendsArray.length);
//     return friendsArray;

//     async function findUser(username) {
//         const res = await fetch('/api/finduser', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username: username
//             })
//         });
//         const data = await res.json();
//         return data;
//     }
// }

export async function getServerSideProps(context) {
    console.log(context.query.username);
    return {
        props: {friends: []}
    }
    // try {
    //     const client = await clientPromise;
    //     const db = client.db("test");
    //     console.log("id: " + context.query.id)
    //     //console.log(mongoose.Types.ObjectId(`${context.query.id}`))
    //     //console.log(Types.ObjectId(`${context.query.id}`))
    //     console.log(ObjectId(`${context.query.id}`))
    //     const recipe = await db
    //         .collection("recipes")
    //         .findOne(new ObjectId(`${context.query.id}`));
    //     console.log("recipe: " + JSON.parse(JSON.stringify(recipe)));
    //     return {
    //         props: {recipe: JSON.parse(JSON.stringify(recipe))},
    //     };
    // }
    // catch (e) {
    //     console.error(e);
    // }
    
}