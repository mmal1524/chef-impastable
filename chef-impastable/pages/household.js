import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { TextField, Grid } from '@mui/material';
import Navbar from './navbar.js'
import Button from '@mui/material/Button';
// import FormGroup from '@mui/material/FormGroup';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import HouseholdCard from '../components/household-card.js';
import CreateHouseholdDialog from '../components/create-household-dialog.js';
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

    const [username, setUsername] = useState("");
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
    const [openCreate, setOpenCreate] = useState(false);
    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };

    // Chosen household to display
    const [chosenName, setChosenName] = useState("")

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <Grid>
                    <Typography>This is where you select each household to view</Typography>
                    <Grid container spacing={3}>
                    {userHouses.map((householdId, index) => (
                        <Grid item 
                            //key={recipe._id}
                        >
                            <HouseholdCard
                                householdId={householdId}
                                index={index}
                            />
                        </Grid>
                    ))}
                    </Grid>
                </Grid>
                <Grid>
                    <Button
                        onClick={() => {
                            handleClickOpenCreate();
                            console.log(openCreate)
                        }}
                    >
                        Create a New Household
                    </Button>
                    <CreateHouseholdDialog
                        username={username}
                        households={userHouses}
                        friends={friends}
                        open={openCreate}
                        onClose = {() => {setOpenCreate(false)}}
                    />
                </Grid>
            </div>
            <div>
                {displayHousehold(chosenName)}
            </div>
        </>
    );

    function displayHousehold(chosenName) {
        if (chosenName == "") {
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
        } else {
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
                    Choose a Household to View.
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Choose a Household to View.
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Choose a Household to View.
                </TabPanel>
            </Grid>
        }

    }
}


