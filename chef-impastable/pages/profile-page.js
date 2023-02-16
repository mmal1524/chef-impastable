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

    var user = {
        displayName: 'Sarah Wagler',
        username: 'sawagler',
        profilePicture: "",
    }

    function getInitials(name) {
        var words = name.split(' ');
        var initials = "";
        words.forEach(function(word) {
            initials += word[0];
        });
        return initials;
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div>
                <Grid container spacing={1}>
                    <Grid xs>
                        {/* Stack to display profile picture, display name, and username */}
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={3}
                        >
                            {/* Profile Picture, if no url, displays user's initials */}
                            <Avatar 
                                sx={{width: 85, height: 85}} 
                                alt={user.displayName} 
                                src={user.profilePicture} 
                            >
                                {getInitials(user.displayName)}
                            </Avatar>
                            {/* Displays user's display name and username next to profile picture */}
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="stretch"
                                spacing={0}
                            >

                                <h1 className="h1">{user.displayName}</h1>
                                <h3 className="h3">{user.username}</h3>
                            </Stack>
                        </Stack>
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
                    .h1 {
                        margin: 0px;
                    }
                    .h3 {
                        margin: 0px;
                    }
                `}</style>

            </div>
            
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
        </>
    );
}