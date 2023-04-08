import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { TextField, Grid } from '@mui/material';
import Navbar from './navbar.js'
import Button from '@mui/material/Button';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox} from '@mui/material';
// import FormGroup from '@mui/material/FormGroup';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// import Fridge from '../components/fridge.js';
// import clientPromise from '../lib/mongodb_client.js';


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

export default function Household() {

    // for create household
    const [newHouseName, setNewHouseName] = useState("");
    const handleChangeNHN = e => {
        setNewHouseName(e.target.value)
    }

    const [username, setUsername] = useState([]);
    //local storage household info
    const [userHouses, setUserHouses] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getName: {
                get() {
                    return this.username
                }
            },
            getFriends: {
                get() {
                    return this.friends
                }
            },
            getHouses: {
                get() {
                    return this.households
                }
            }
        });
        setUsername(thisUser.getName);
        setFriends(thisUser.getFriends);
        setUserHouses(thisUser.getHouses);
    }, [])


    // for the tabs
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [value, setValue] = useState(0);
    const router = useRouter();
    const [windowSize, setWindowSize] = useState([1400,0,]);
    useEffect(() => {
        const handleWindowResize = () => {
          setWindowSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', handleWindowResize);
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    });
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // create new Household popup
    const [openPopup, setOpen] = React.useState(false);
    const handleClickOpenPopup = () => {
        setOpen(true);
    };
    const handleClosePopup = () => {
        setNewHouseName("");
        setOpen(false);
    };

    // error creating household (no inputted name)
    const [openNameError, setNameError] = React.useState(false);
    const handleClickOpenNameError = () => {
        setNameError(true);
    };
    const handleCloseNameError = () => {
        setNameError(false);
    };

    var [sendList, setSendList] = useState([]);

    const handleCreate = async () => {
        if (newHouseName != "") {
            setNewHouseName("");
            // creating a household object
            var newHouseID = await CreateHouse(newHouseName);
            console.log(newHouseID);

            // adding user to household
            var householdUpdated = await AddUsertoHousehold(newHouseID.householdID, username);
            console.log(householdUpdated)
            // adding householdID to user's household
            var userUpdated = await AddHouseholdtoUser(username, newHouseID.householdID);
            console.log(userUpdated);
            localStorage.setItem('user', JSON.stringify(userUpdated));

            for (let i = 0; i < sendList.length; i++) {
                var addUser = await AddUsertoHousehold(newHouseID.householdID, sendList[i]);
                var addHouse = await AddHouseholdtoUser(sendList[i], newHouseID.householdID);
            }

            handleClosePopup();
        } else {
            handleClickOpenNameError()
        }
        
    }
    async function CreateHouse(name) {
        const res = await fetch('api/createNewHousehold', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
            })
        });
        const data = await res.json();
        return data;
    }
    
    async function AddUsertoHousehold(householdID, username) {
        const res = await fetch('api/addUsertoHousehold', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                householdID: householdID,
                username: username,
            })
        });
        const data = await res.json();
        return data;
    }
    
    async function AddHouseholdtoUser(username, householdID) {
        const res = await fetch('api/addHouseholdtoUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                householdID, householdID,
            })
        });
        const data = await res.json();
        return data;
    }


    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <Grid>
                    <Typography>This is where you select each household to view</Typography>
                    <Button
                        onClick={() => {
                            handleClickOpenPopup();
                        }}
                    >
                        Create a New Household
                    </Button>
                </Grid>
            </div>
            <div>
                <Grid container sx={{ width: '100%' }}>
                    <Grid 
                        justifyContent='center'
                        sx={{ borderBottom: 1, borderColor: 'divider', width: windowSize[0] }}
                    >
                        <Tabs value={value} onChange={handleChange} variant="fullWidth">
                            <Tab label="Members" {...a11yProps(0)} />
                            <Tab label="Shared Fridge" {...a11yProps(1)} />
                            <Tab label="Saved Recipes" {...a11yProps(2)} />
                        </Tabs>
                    </Grid>
                    <TabPanel value={value} index={0}>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                    </TabPanel>
                </Grid>
            </div>
            <div>
            <Dialog
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'sm'}
                open={openPopup}
                onClose={handleClosePopup}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Create New Household"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Name:
                    </DialogContentText>
                    <TextField
                        id="newHouseName"
                        label="Name this household!"
                        variant="outlined"
                        value={newHouseName} 
                        onChange={handleChangeNHN} 
                    />
                    <DialogContentText>
                        Select friends:
                        {displayFriends(friends)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup} autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'sm'}
                open={openNameError}
                onClose={handleCloseNameError}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Error: No Name"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please input a name for your household.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNameError} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

            </div>
        </>
    );

    function displayFriends(friendsList) {
        const [checked, setChecked] = React.useState([0]);

        const handleToggle = (value) => () => {
            const currentIndex = checked.indexOf(value);
            const newChecked = [...checked];

            if (currentIndex === -1) {
                newChecked.push(value);
            } else {
                newChecked.splice(currentIndex, 1);
            }

            setChecked(newChecked);
        };

        var j = 0;
        sendList = []
        for (j; j < checked.length; j++) {
            sendList.push(friendsList[checked[j]])
        }

        
        if (friendsList.length == 0) {
            return(<>You have no friends :(</>);
        } else {
            var friendListLength = new Array; 
            var i = 0;
            for (i; i < friendsList.length; i++) {
                friendListLength.push(i);
            }
            return (
                <List sx={{ width: '100%', maxWidth: 360, maxHeight: 200, bgcolor: 'background.paper' }}>
                {friendListLength.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
            
                    return (
                    <ListItem
                        key={value}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                        <ListItemIcon>
                            <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${friendsList[value]}`} />
                        </ListItemButton>
                    </ListItem>
                    );
                })}
                </List>
            );
        }
    }
}


