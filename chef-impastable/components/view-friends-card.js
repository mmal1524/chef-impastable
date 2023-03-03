import React from "react";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getInitials } from "./user";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import swal from 'sweetalert';
import { useRouter } from "next/router";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";



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


export function viewFriendProfile(username, createdPriv, savedPriv, reviewedPriv, mealPlanPriv) {
    
    var friend = username;
    var created = createdPriv;
    var saved = savedPriv; 
    var reviewed = reviewedPriv;
    var mealplan = mealPlanPriv;

    const [value, setValue] = useState(0);
    const router = useRouter();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [friendName, setFriendName] = useState("");
    const [password, setPassword] = useState("");
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
            getFriendName: {
                get() {
                    return this.friendName
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
            }
        });
        setFriendName(thisUser.getFriendName);
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
                                localStorage.setItem('user', JSON.stringify({
                                    username: username,
                                    password: password,
                                    displayName: displayName,
                                    avatar: avatar,
                                    friends: friends,
                                    friendRequests: friendRequests,
                                    createdPrivacy: createdPrivacy,
                                    savedPrivacy: savedPrivacy,
                                    reviewedPrivacy: reviewedPrivacy,
                                    mealPlanPrivacy: mealPlanPrivacy
                                 }))
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
                            {displayFriends(friendsList)}
                        </Box>
                    </Grid>
                    {/* Displays user's friend requests */}
                    <Grid xs={4}>
                        <Box sx={{width: '100%', marginBottom: 4}}>
                            <h3 className="h3">Friend Requests</h3>
                            <Divider />
                            {displayFriendRequests(friendRequestsList)}
                        </Box>
                    </Grid>

                </Grid>



                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Created Recipes" {...a11yProps(0)} />
                            <Tab label="Saved Recipes" {...a11yProps(1)} />
                            <Tab label="Reviewed Recipes" {...a11yProps(2)} />
                            <Tab label="Meal Plans" {...a11yProps(3)} />
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
                    <TabPanel value={value} index={3}>
                        Here is where meal plans will go
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
            
        </>
    );

    function displayFriends(friendsList) {
        if (friendsList.length == 0) {
            return(<>You have no friends :(</>);
        } else {
            return (
                friendsList.map((friend) => (
                    friendCard(friend)
                ))
            );
        }
    }

    function displayFriendRequests(friendRequestsList) {
        if (friendRequestsList.length == 0) {
            return (<>No friend requests</>);
        } else {
            return (
                friendRequestsList.map((friendRequest) => (
                    friendRequestCard(friendRequest)
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
        var friendRequests = user[0].friendRequests;

        const friendObjects = new Array(friends.length);
        var i = 0;
        for (i; i < friends.length; i++) {
            var f = await db
                .collection("users")
                .find({username: friends[i]}).toArray();
            friendObjects[i] = JSON.parse(JSON.stringify(f[0]));
        }

        const friendRequestsObjects = new Array(friendRequests.length);
        for (i = 0; i < friendRequests.length; i++) {
            var fr = await db
                .collection("users")
                .find({username: friendRequests[i]}).toArray();
            friendRequestsObjects[i] = JSON.parse(JSON.stringify(fr[0]));
        }

        return {
            props: {besties: friendObjects, futureBesties: friendRequestsObjects},
        };
    }
    catch (e) {
        console.error(e);
    }
}