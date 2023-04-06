import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { TextField, Grid } from '@mui/material';
import Navbar from './navbar.js'
import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import ListItemText from '@mui/material/ListItemText';
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

    useEffect(() => {
        const thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getName: {
                get() {
                    return this.username
                }
            },
        });
        setUsername(thisUser.getName);
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

    const [openPopup, setOpen] = React.useState(false);
    const handleClickOpenPopup = () => {
        setOpen(true);
    };
    const handleClosePopup = () => {
        setOpen(false);
    };

    const handleCreate = async () => {
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

        handleClosePopup();
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup} autoFocus>
                        Cancel
                    </Button>
                    <Button 
                        // makee sure that there is a name before can click
                    onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
            </div>
        </>
    );
}


