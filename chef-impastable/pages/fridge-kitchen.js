import * as React from 'react';
import Link from 'next/link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Divider, TextField, Grid } from '@mui/material';
import Navbar from './navbar.js'
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useRouter } from 'next/router';
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
          <Grid sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Grid>
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

export default function Kitchen() {

    // local storage kitchen info
    const [username, setUsername] = useState("");
    const [appValue, setAppUser] = useState("");
    const [userApps, setUserApps] = useState([]);

    useEffect(() => {
        const thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getApps: {
                get() {
                    return this.kitchen
                },
            },
            getUsername: {
                get() {
                    return this.username
                }
            },
        });
        setUsername(thisUser.getUsername);
        setUserApps(thisUser.getApps);
    }, [])


    // for the tabs
    const [value, setValue] = React.useState(0);
    const router = useRouter();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>

            <div className="App">
                <Navbar />
            </div>
            <h2>
                <Link href="/homepage">Back to home</Link>
            </h2>
            <div>
                <Grid sx={{ width: '100%' }}>
                    <Grid sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Fridge" {...a11yProps(0)} />
                            <Tab label="Kitchen" {...a11yProps(1)} />
                        </Tabs>
                    </Grid>
                    <TabPanel value={value} index={0}>
                    <Grid container>
                            <Grid>
                                <TextField
                                    id="search-fridge"
                                    label="Search"
                                    variant="outlined"
                                    sx={{
                                        width: 600
                                    }}
                                />
                                <Button 
                                    type="submit" 
                                    size="large"
                                    variant="contained"
                                    sx={{
                                        mx: 3,
                                        mt: 1,
                                    }}
                                    onClick={() => {
                                        //search for appliance
                                        console.log("clicked")
                                    }}
                                >
                                    Enter
                                </Button>
                            </Grid>
                            <Grid item xs></Grid>
                            <Grid>
                                <Button 
                                    type="submit" 
                                    size="large"
                                    variant="contained"
                                    sx={{
                                        mx: 3,
                                        mt: 1,
                                    }}
                                    onClick={() => {
                                        //route to edit page
                                        console.log("clicked")
                                    }}
                                >
                                    Edit Fridge
                                </Button>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        { /*search bar and edit button at the top*/ }
                        <Grid container>
                            <Grid>
                                <TextField
                                    id="search-kitchen"
                                    label="Search"
                                    variant="outlined"
                                    sx={{
                                        width: 600
                                    }}
                                />
                                <Button 
                                    type="submit" 
                                    size="large"
                                    variant="contained"
                                    sx={{
                                        mx: 3,
                                        mt: 1,
                                    }}
                                    onClick={() => {
                                        //search for appliance
                                        console.log("clicked")
                                    }}
                                >
                                    Enter
                                </Button>
                            </Grid>
                            <Grid item xs></Grid>
                            <Grid>
                                <Button 
                                    type="submit" 
                                    size="large"
                                    variant="contained"
                                    sx={{
                                        mx: 3,
                                        mt: 1,
                                    }}
                                    onClick={() => {
                                        router.push('/edit-kitchen');
                                        console.log("clicked")
                                    }}
                                >
                                    Edit Kitchen
                                </Button>
                            </Grid>
                        </Grid>
                        
                        { /*displaying appliances in rows */ }
                        {userApps && userApps.map((app, index) => (
                            <div>
                                <Box
                                    sx={{ flexGrow: 1, maxWidth: 752 }}
                                    alignItems='center'
                                    justify='center'
                                    display='flex'
                                >
                                    <FormGroup row>
                                    </FormGroup>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <List dense={dense}>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={tag}
                                                    />
                                                </ListItem>
                                            </List>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </div>
                        ))}

                    </TabPanel>
                </Grid>
            </div>
        </>
    );
}