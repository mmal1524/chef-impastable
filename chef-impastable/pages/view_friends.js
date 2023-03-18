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

export default function ViewFriends(friend) {
    console.log('this is the function')
    console.log(friend)
    const [username, setUsername] = useState("");
    var [displayName, setDisplayName] = useState("");
    var [avatar, setAvatar] = useState("");
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
      setCreatedPrivacy(thisUser.getCreatedPrivacy);
      setSavedPrivacy(thisUser.getSavedPrivacy);
      setReviewedPrivacy(thisUser.getReviewedPrivacy);
      setMealPlanPrivacy(thisUser.getMealPlanPrivacy)
  }, []);

  const [friendUsername, setFriendUsername] = useState("");
    var [friendDisplayName, setFriendDisplayName] = useState("");
    var [friendAvatar, setFriendAvatar] = useState("");
    var [friendCreatedPrivacy, setFriendCreatedPrivacy] = useState("");
    var [friendSavedPrivacy, setFriendSavedPrivacy] = useState("");
    var [friendReviewedPrivacy, setFriendReviewedPrivacy] = useState("");
    var [friendMealPlanPrivacy, setFriendMealPlanPrivacy] = useState("");

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
                    {displayCreated(friendCreatedPrivacy)}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {displaySaved(friendSavedPrivacy)}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {displayReviewed(friendReviewedPrivacy)}
                </TabPanel>
                <TabPanel value={value} index={3}>
                    {displayMealPlans(friendMealPlanPrivacy)}
                </TabPanel>
            </Box>
        </div>
    );

}

function displayCreated(privacy) {
    if (privacy == null) {
        return (<>there's something missing in this user</>)
    }
    if (privacy == "everyone") {
      return (<>This is where created recipes will go!<br></br></>)
    }
    if (privacy == "friends only") {
        //need to find out if this user is friends with current logged in user
        return (<>friends</>)
        //else return you have to be friends to see this users
    }
    if (privacy == "nobody") {
        return (<>This user's created recipes are private</>)
    }
  }

  function displaySaved(privacy) {
    if (privacy == null) {
        return (<>there's something missing in this user</>)
    }
    if (privacy == "everyone") {
      return (<>This is where saved recipes will go!<br></br></>)
    }
    if (privacy == "friends only") {
        //need to find out if this user is friends with current logged in user
        return (<>friends</>)
        //else return you have to be friends to see this users
    }
    if (privacy == "nobody") {
        return (<>This user's saved recipes are private</>)
    }
  }

  function displayReviewed(privacy) {
    if (privacy == null) {
        return (<>there's something missing in this user</>)
    }
    if (privacy == "everyone") {
      return (<>This is where reviewed recipes will go!<br></br></>)
    }
    if (privacy == "friends only") {
        //need to find out if this user is friends with current logged in user
        return (<>friends</>)
        //else return you have to be friends to see this users
    }
    if (privacy == "nobody") {
        return (<>This user's reviewed recipes are private</>)
    }
  }

  function displayMealPlans(privacy) {
    if (privacy == null) {
        return (<>there's something missing in this user</>)
    }
    if (privacy == "everyone") {
      return (<>This is where meal plans will go!<br></br></>)
    }
    if (privacy == "friends only") {
        //need to find out if this user is friends with current logged in user
        return (<>friends</>)
        //else return you have to be friends to see this users
    }
    if (privacy == "nobody") {
        return (<>This user's meal plans are private</>)
    }
  }

  export async function getServerSideProps(context) {
    console.log("query: " + context.query)
    try {
        const client = await clientPromise;
        const db = client.db("test");
        const viewfriend = await db
            .collection("users")
            .findOne({username: context.query.username})
        console.log(viewfriend)
        return {
            props: { friend: JSON.parse(JSON.stringify(viewfriend)) },
        };
    }
    catch (e) {
        console.error(e);
    }
}