import * as React from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

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

class User {
    constructor(displayName, username, profilePicture, friends, friendRequests) {
        this.displayName = displayName;
        this.username = username;
        this.profilePicture = profilePicture;
        this.friends = friends;
        this.friendRequests = friendRequests;
    }

    getInitials() {
        var words = this.displayName.split(' ');
        var initials = "";
        words.forEach(function(word) {
            initials += word[0];
        });
        return initials;
    }

    displayLarge() {
        return (
            <>
                {/* Stack to display user's profile picture, display name, and username */}
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={3}
                >
                    {/* Profile Picture, if no url, displays user's initials */}
                    <Avatar 
                        sx={{width: 85, height: 85}} 
                        alt={this.displayName} 
                        src={this.profilePicture} 
                    >
                        {this.getInitials()}
                    </Avatar>
                    {/* Displays user's display name and username next to profile picture */}
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={0}
                    >
                        <h1 className="displayName">{this.displayName}</h1>
                        <h3 className="username">{this.username}</h3>
                    </Stack>

                </Stack>

                <style jsx>{`
                    .displayName {
                        margin: 0px;
                    }
                    .username {
                        margin: 0px;
                    }
                `}</style>
            </>

        );
    }

    displaySmall() {
        return (
            <Box sx={{margin: 1, marginLeft: 0}}>
                {/* Stack to display user's profile picture, display name, and username */}
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={3}
                >
                    {/* Profile Picture, if no url, displays user's initials */}
                    <Avatar 
                        sx={{width: 40, height: 40}} 
                        alt={this.displayName} 
                        src={this.profilePicture} 
                    >
                        {this.getInitials()}
                    </Avatar>
                    {/* Displays user's display name and username next to profile picture */}
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={0}
                    >
                        <h3 className="displayName">{this.displayName}</h3>
                        <h5 className="username">{this.username}</h5>
                    </Stack>

                </Stack>

                <style jsx>{`
                    .displayName {
                        margin: 0px;
                    }
                    .username {
                        margin: 0px;
                    }
                `}</style>
            </Box>

        );
    }

    displayFriends() {
        for (let i = 0; i < this.friends.length; i++) {
            this.friends[i].displaySmall();
        }
    }
}


export default function ProfilePage() {

    var friend1 = new User('Mahima', 'mahimasusername', "", [], []);
    var friend2 = new User('Jiahui', 'jiahuisusername', "", [], []);
    var friend3 = new User('Kendalyn', 'kendalynsusername', "", [], []);
    var friend4 = new User('Carmen', 'carmentsusername', "", [], []);
    var user = new User('Sarah Wagler', 'sawagler', "", [friend1, friend2, friend3], [friend4]);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div>
                <Grid container spacing={6}>
                    <Grid xs={10}>
                        {/* Displaying user's profile picture, name, and username */}
                        {user.displayLarge()}
                    </Grid>
                    <Grid xs={2}>
                        {/* Edit profile button */}
                        <Button 
                            variant="outlined" 
                            startIcon={<SettingsIcon />} 
                            sx={{color: 'black', borderColor: 'black'}}
                            onClick={() => {
                                window.location.href="/edit-profile";
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
                            {user.friends[0].displaySmall()}
                            {user.friends[1].displaySmall()}
                            {user.friends[2].displaySmall()}
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
                                {user.friendRequests[0].displaySmall()}
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
}