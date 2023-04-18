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
import AddHouseholdDialog from '../components/add-user-to-household-dialog.js';
import LeaveHouseholdDialog from '../components/leave-household-dialog.js';
import SavedRecipes from '../components/savedRecipes.js';
//import clientPromise from '../lib/mongodb_client.js';
// import Fridge from '../components/fridge.js';
import clientPromise from '../lib/mongodb_client.js';
import Fridge from '../components/fridge-house.js';


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
    // var currID = props.id;
    const [currID, setCurrID] = useState(props.id)

    const [username, setUsername] = useState("");
    //local storage household info
    const [userHouses, setUserHouses] = useState([]);
    const [friends, setFriends] = useState([]);
    const [update, setUpdate] = useState(0);
    useEffect(() => {
        setCurrID(props.id);
        setUpdate(update + 1);
    }, [props.id])
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
    const [currName, setCurrName] = useState("");
    const [currMembers, setCurrMembers] = useState([]);
    const [currFridge, setCurrFridge] = useState([]);
    const [currFridgeGroup, setCurrFridgeGroup] = useState({});
    const handleDisplayChosen = async () => {
        var house = await getHouseholdFromID(currID);
        setCurrHouse(house);
        setCurrMembers(house.members);
        setCurrFridge(house.fridge);
        setCurrFridgeGroup(house.fridge_grouped);
        setCurrName(house.name)
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
    // choose which friends to add
    const [openAddFriend, setOpenAddFriend] = useState(false);
    const handleClickOpenAddF = async () => {
        await handleDisplayChosen();
        setOpenAddFriend(true);
    };

    // fridge tab
    const ingredientArr = props.ingredientOptions.map(a => a.ingredient);

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>
                {displayHouseCards(userHouses)}
                {/* <Box sx={{ flexGrow: 1 }}>
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
                </Box> */}
                <Grid>
                    <Button onClick={() => {handleClickOpenCreate()}}>
                        Create a New Household
                    </Button>
                </Grid>
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center' }}>
                <h2>{currName}</h2>
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
                        {displayHouseholdFridge(currID, ingredientArr, currFridge, currFridgeGroup)}
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {displayHouseholdSaved(currID)}
                    </TabPanel>
                </Grid>
            </div>
            <div>
                <CreateHouseholdDialog
                    username={username}
                    friends={friends}
                    open={openCreate}
                    onClose = {() => {setOpenCreate(false); setUpdate(update + 1);}}
                /> 
                <AddHouseholdDialog
                    //username={username}
                    householdId={currID}
                    friends={friends}
                    members={currMembers}
                    open={openAddFriend}
                    onClose= {() => {setOpenAddFriend(false); setUpdate(update + 1);}}
                />
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

    function displayHouseCards(houses) {
        console.log(houses);
        if (houses == null || houses.length == 0) {
            return (<div style={{display: 'flex',  justifyContent:'center', alignItems:'center' }}>You are not part of any household. Create one!</div>)
        } else {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3} sx={{width: '100vw'}}>
                        {houses.map((householdId, index) => (
                            <Grid xs item 
                                //key={recipe._id}
                                sx={{
                                    //border: 4,
                                    //borderColor: householdId == currID ? 'greenyellow' : 'white',
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
            );
        }
    }

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
                    <Button onClick={()=> {handleClickOpenAddF()}}>
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

    function displayHouseholdFridge(id, ingrArr,fridge, fridge_g) {
        if (fridge == null) {
            return (<div>Choose a household to view</div>)
        } else {
            return (
                <>
                <Fridge 
                    onSubmit={() =>{setUpdate(update + 1);}}
                    id={id}
                    ingr={ingrArr}
                    fridge={fridge}
                    fridge_grouped={fridge_g}
                />
                </>
            );
        }
    }

    function displayHouseholdSaved(saved) {
        if (saved == null) {
            return (<div>Choose a household to view</div>)
        } else {
            return (<SavedRecipes isHouse={true} houseID={currID}/>)
        }
    }
}

export async function getServerSideProps(context) {
    console.log(context.query.id)

    const client = await clientPromise;
        const db = client.db("test");
        const ingredientOptions = await db
            .collection("ingredients")
            .find({})
            .toArray();

    if (context.query.id == null) {
        return {
            props: {id: null, ingredientOptions: JSON.parse(JSON.stringify(ingredientOptions))}
        }
    } else {
        const id = context.query.id;
        return {
            props: {id: JSON.parse(JSON.stringify(id)), ingredientOptions: JSON.parse(JSON.stringify(ingredientOptions))}
        }
    }
}


