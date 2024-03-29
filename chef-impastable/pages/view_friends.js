import Navbar from './navbar.js'
import * as React from 'react';
import { useState, useEffect } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { displayLarge } from '../components/user';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import clientPromise from '../lib/mongodb_client';
import { reviewCardButton } from '../components/review-card-button.js';
import { ObjectId } from 'mongodb';
import RecipeCard from '../components/recipe-card.js';
import SavedRecipes from '../components/savedRecipes.js';


import { useRouter } from "next/router";

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
            <Box>{children}</Box>
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

export default function ViewFriends(friend) {
    const [username, setUsername] = useState("");
    var [displayName, setDisplayName] = useState("");
    var [avatar, setAvatar] = useState("");
    var [friends, setFriends] = useState([]);
    var [createdPrivacy, setCreatedPrivacy] = useState("");
    var [savedPrivacy, setSavedPrivacy] = useState("");
    var [reviewedPrivacy, setReviewedPrivacy] = useState("");
    var [mealPlanPrivacy, setMealPlanPrivacy] = useState("");

    useEffect(() => {
      var thisUser = JSON.parse(localStorage.getItem('user'));
      console.log("user")
      console.log(thisUser)
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
      setFriends(thisUser.getFriends)
      setCreatedPrivacy(thisUser.getCreatedPrivacy);
      setSavedPrivacy(thisUser.getSavedPrivacy);
      setReviewedPrivacy(thisUser.getReviewedPrivacy);
      setMealPlanPrivacy(thisUser.getMealPlanPrivacy)
  }, []);

    const friendUsername = friend.friend.username;
    var friendDisplayName = friend.friend.displayName;
    var friendAvatar = friend.friend.avatar;
    var friendCreatedPrivacy = friend.friend.createdPrivacy;
    var friendSavedPrivacy = friend.friend.savedPrivacy;
    var friendReviewedPrivacy = friend.friend.reviewedPrivacy;
    var friendMealPlanPrivacy = friend.friend.mealPlanPrivacy;

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const router = useRouter();

    return (
        <div>
            <div>
                <Navbar /> 
            </div>
            <Grid container spacing={6}>
                <Grid xs={10}>
                    {/* Displaying user's profile picture, name, and username */}
                    {displayLarge(friendUsername, friendDisplayName, friendAvatar)}
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
                    {displayCreated(friendCreatedPrivacy, friendUsername, friends, friend.createdRecipes)}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {displaySaved(friendSavedPrivacy, friendUsername, friends)}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {displayReviewed(friendReviewedPrivacy, friendUsername, friends, friend.reviews, friend.recipes)}
                </TabPanel>
                <TabPanel value={value} index={3}>
                    {displayMealPlans(friendMealPlanPrivacy, friendUsername, friends)}
                </TabPanel>
            </Box>
        </div>
    );
}

function displayCreated(privacy, target, myFriends, createdRecipes) {
    function createdRecipeDisplay() {
        console.log(createdRecipes)
        return (<>{
            createdRecipes.length == 0 ? 
            <p>"This user has no created recipes" </p>
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
        }</>)
    }
    if (privacy == null) {
        return (<>error: there's something missing in this user</>)
    }
    if (privacy == "everyone") {
      return createdRecipeDisplay(createdRecipes)
        
    }
    if (privacy == "friends only") {
        if (myFriends.includes(target)) {
            return (createdRecipeDisplay(createdRecipes));
        } else {
            console.log(target in myFriends)
            return (<>Become friends to view this user's created recipes!</>);
        }
    }
    if (privacy == "nobody") {
        return (<>This user's created recipes are private!</>)
    }
  }

  function displaySaved(privacy, target, myFriends) {
    if (privacy == null) {
        return (<>error: there's something missing in this user</>)
    }
    if (privacy == "everyone") {
        console.log(target)
      return (<SavedRecipes isHouse={false} user={target} />)
    }
    if (privacy == "friends only") {
        if (myFriends.includes(target)) {
            return (<SavedRecipes isHouse={false} user={target} />);
        } else {
            console.log(target in myFriends)
            return (<>Become friends to view this user's saved recipes!</>);
        }
    }
    if (privacy == "nobody") {
        return (<>This user's saved recipes are private!</>)
    }
  }

  function displayReviewed(privacy, target, myFriends, reviews, recipes) {
    if (privacy == null) {
        return (<>error: there's something missing in this user</>)
    }
    if (privacy == "everyone") {
        var i = 0;
        if (!reviews || reviews.length == 0) {
            return(<div data-test="reviews" number={0} >This user hasn't created any reviews!</div>);
        } else {
            return(
                <div data-test="reviews" number={reviews.length}>
                {reviews.map((review, index) => (
                    reviewCardButton(review, recipes[i++], index)
                ))}
                </div>
            );
        }
    }
    if (privacy == "friends only") {
        if (myFriends.includes(target)) {
            var i = 0;
        if (!reviews || reviews.length == 0) {
            return(<div data-test="reviews" number={0} >This user hasn't created any reviews!</div>);
        } else {
            return(
                <div data-test="reviews" number={reviews.length}>
                {reviews.map((review, index) => (
                    reviewCardButton(review, recipes[i++], index)
                ))}
                </div>
            );
        }
        } else {
            console.log(target in myFriends)
            return (<>Become friends to view this user's reviewed recipes!</>);
        }
    }
    if (privacy == "nobody") {
        return (<>This user's reviewed recipes are private!</>)
    }
  }

  function displayMealPlans(privacy, target, myFriends) {
    if (privacy == null) {
        return (<>error: there's something missing in this user</>)
    }
    if (privacy == "everyone") {
      return (<>Everyone: This is where meal plans will go!</>)
    }
    if (privacy == "friends only") {
        if (myFriends.includes(target)) {
            return (<>Friends: This is where meal plans will go!</>);
        } else {
            console.log(target in myFriends)
            return (<>Become friends to view this user's meal plans!</>);
        }
    }
    if (privacy == "nobody") {
        return (<>This user's meal plans are private!</>)
    }
  }

  export async function getServerSideProps(context) {
    console.log("query: " + context.query.username)
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const viewfriend = await db
            .collection("users")
            .findOne({username: context.query.username});
    
        var reviews = viewfriend.reviewedRecipes;
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

        const createdRecipes = JSON.parse(JSON.stringify(await db
            .collection("recipes")
            .find({author: context.query.username, isUser: true})
            .toArray()));

        return {
            props: { friend: JSON.parse(JSON.stringify(viewfriend)), reviews: reviewObjects, recipes: recipeObjects, createdRecipes: createdRecipes },
        };
    }
    catch (e) {
        console.error(e);
    }
}