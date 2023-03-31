import * as React from 'react';
import { displayLarge } from '../components/user';
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
import { friendRequestCard } from '../components/friend-request-card';
import clientPromise from '../lib/mongodb_client';
import SavedRecipes from '../components/savedRecipes';
import { reviewCardButton } from '../components/review-card-button';
import { ObjectId } from 'mongodb';


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

export default function ProfilePage({besties, futureBesties, reviews, recipes, createdRecipes}) {

    var friendsList = besties;
    var friendRequestsList = futureBesties;
    var reviewsList = reviews;

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
    const [kitchen, setKitchen] = useState([]);
    const [fridge_grouped, setFridgeGrouped] = useState({});
    var [reviewedRecipes, setReviewedRecipes] = useState([]);

    
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
            },
            getReviewedRecipes: {
                get() {
                    return this.reviewedRecipes
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
        setMealPlanPrivacy(thisUser.getMealPlanPrivacy);
        setReviewedRecipes(thisUser.getReviewedRecipes);
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
                            <Tab label="Saved Recipes" {...a11yProps(1)}  data-test="ProfileSavedTab"/>
                            <Tab label="Reviewed Recipes" {...a11yProps(2)} />
                            <Tab label="Meal Plans" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        {createdRecipes.length == 0 ? 
                            "You have no created recipes" 
                        : 
                        <Grid container spacing ={3}>
                        {createdRecipes.map((recipe, index) => (                
                            <Grid item key={recipe._id}>
                                <RecipeCard 
                                    recipe={recipe}
                                />
                            </Grid>
                            ))}
                        </Grid>
                        }
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SavedRecipes></SavedRecipes>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {displayReviews(reviewsList)}
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

    function displayReviews(reviews) {
        var i = 0;
        if (!reviews || reviews.length == 0) {
            return(<>No reviews, create one now!</>);
        } else {
            return(
                reviews.map((review) => (
                    reviewCardButton(review, recipes[i++])
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

        var reviews = user[0].reviewedRecipes;
        var reviewObjects;
        if (!reviews) {
            reviewObjects = [];
        }
        else {
            reviewObjects = new Array(reviews.length);
            var i = 0;
            for (i; i < reviews.length; i++) {
                var r = await db
                    .collection("reviews")
                    .find({_id: reviews[i]}).toArray();
                reviewObjects[i] = JSON.parse(JSON.stringify(r[0]));
            }
        }

        var recipeObjects;
        if (!reviews) {
            recipeObjects = [];
        }
        else {
            var recipeids = new Array(reviewObjects.length);
            var i = 0;
            for (i; i < reviewObjects.length; i++) {
                recipeids[i] = new ObjectId(reviewObjects[i].recipeID);
            }
            recipeObjects = new Array(reviews.length);
            for (i = 0; i < reviewObjects.length; i++) {
                var r = await db
                    .collection("recipes")
                    .find({_id: recipeids[i]}).toArray();
                recipeObjects[i] = JSON.parse(JSON.stringify(r[0]));
            }
        }

        const createdRecipes = await db
            .collection("recipes")
            .find({author: context.query.username})
            .toArray();

        return {
            props: {besties: friendObjects, futureBesties: friendRequestsObjects, reviews: reviewObjects, recipes: recipeObjects, createdRecipes: createdRecipes},
        };
    }
    catch (e) {
        console.error(e);
    }
}

