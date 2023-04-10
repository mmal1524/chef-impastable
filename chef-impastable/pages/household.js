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
//import clientPromise from '../lib/mongodb_client.js';
// import Fridge from '../components/fridge.js';


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

export default function Household(props) {
    //console.log(props);
    var currID = props.id;
    //console.log(currID);

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

    // create new Household popup
    const [openCreate, setOpenCreate] = useState(false);
    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };

    // for the tabs
    // console.log(household);
    // var currHouse = household;
    // console.log(currHouse);

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

    // Chosen household to display
    const [currHouse, setCurrHouse] = useState();
    const [currMembers, setCurrMembers] = useState([]);
    const [currFridge, setCurrFridge] = useState([]);
    const handleDisplayChosen = async () => {
        //console.log("in handle")
        var house = await getHouseholdFromID(currID);
        //console.log(house);
        setCurrHouse(house);
        setCurrMembers(house.members);
        setCurrFridge(house.fridge);
        //console.log(currHouse);
    }
    handleDisplayChosen();
    //console.log(currHouse);

    async function getHouseholdFromID(id) {
        //console.log(id);
        const res = await fetch('/api/getHouseholds', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: id,
                getData: true,
            })
        })
        const data = await res.json();
        //console.log(data);
        return data;
    }

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3} sx={{width: '100vw'}}>
                        {userHouses.map((householdId, index) => (
                            <Grid xs item 
                                //key={recipe._id}
                                sx={{
                                    border: 4,
                                    borderColor: householdId == currID ? 'greenyellow' : 'white',
                                    justifyContent: 'center'
                                }}
                            >
                                <HouseholdCard
                                    householdId={householdId}
                                    index={index}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
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
                    {displayHouseholdMembers(currMembers)}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {displayHouseholdFridge(currFridge)}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {displayHouseholdSaved(currHouse)}
                </TabPanel>
            </Grid>
            </div>
        </>
    );

    function displayHouseholdMembers(members) {
        if (members == null) {
            return (<div>Choose a household to view</div>)
        } else {
            return (<div>Something will show up.</div>)
        }
    }

    function displayHouseholdFridge(fridge) {
        if (fridge == null) {
            return (<div>Choose a household to view</div>)
        } else {
            return (<div>Something will show up.</div>)
        }
    }

    function displayHouseholdSaved(saved) {
        if (saved == null) {
            return (<div>Choose a household to view</div>)
        } else {
            return (<div>Something will show up.</div>)
        }
    }
}

export async function getServerSideProps(context) {
    console.log(context.query.id)
    if (context.query.id == null) {
        return {props: {id: null}}
    } else {
        const id = context.query.id;
        return {
            props: {id: JSON.parse(JSON.stringify(id))}
        }
    }
}


