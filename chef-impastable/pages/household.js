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
import {FormGroup, List, ListItemText } from '@mui/material';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import HouseholdCard from '../components/household-card.js';
import CreateHouseholdDialog from '../components/create-household-dialog.js';
import LeaveHouseholdDialog from '../components/leave-household-dialog.js';
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
    var currID = props.id;

    const [username, setUsername] = useState("");
    //local storage household info
    const [userHouses, setUserHouses] = useState([]);
    const [friends, setFriends] = useState([]);
    const [update, setUpdate] = useState(0);
    useEffect(() => {
        setUpdate(update + 1);
    }, [currID])
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
        handleDisplayChosen();
    }, [update])
    //console.log(userHouses)

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
    const [value, setValue] = useState(0);
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
        var house = await getHouseholdFromID(currID);
        setCurrHouse(house);
        setCurrMembers(house.members);
        setCurrFridge(house.fridge);
    }

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

    // members tab
    //confirm leave household popup
    const [openLeaveConf, setOpenLeaveConf] = useState(false);
    const handleClickOpenLeave = () => {
        setOpenLeaveConf(true);
    };
    const handleCloseLeave = () => {
        setOpenLeaveConf(false);
    };

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
                                    update={update}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Grid>
                    <Button onClick={() => {handleClickOpenCreate()}}>
                        Create a New Household
                    </Button>
                    <CreateHouseholdDialog
                        username={username}
                        friends={friends}
                        open={openCreate}
                        onClose = {() => {setOpenCreate(false); setUpdate(update + 1);}}
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
            <div>
                <LeaveHouseholdDialog
                    username={username}
                    householdId={currID}
                    members={currMembers}
                    open={openLeaveConf}
                    onClose = {() => {setOpenLeaveConf(false); setUpdate(update + 1);}}
                />
            </div>
        </>
    );

    function displayHouseholdMembers(members) {
        if (members == null) {
            return (<div>Choose a household to view</div>)
        } else {
            return (
            <Box sx={{flexGrow: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', width: '100vw'}}>
                <Grid>
                    {members.map((user, index) => (
                        <Box>
                            <FormGroup row>
                            </FormGroup>
                            <Grid container>
                                <Grid 
                                    item xs={12} 
                                    sx={{justifyContent: 'center'}}
                                >
                                    <List>
                                        <ListItemText sx={{display:'flex', justifyContent:'center'}} primary={user}/>
                                    </List>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                </Grid>
                <Grid sx={{justifyContent: 'center', display: 'grid', gap: 2, gridTemplateRows: 'repeat(2, 1fr)'}}>
                    <Button onClick={()=> {}}>
                        Add Friend to the Household.
                    </Button>
                    <Button variant='outlined' color='error' onClick={()=> {handleClickOpenLeave()}}>
                        Leave the Household.
                    </Button>
                </Grid>
            </Box>
            );
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


