import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
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
import { useTheme } from '@material-ui/core/styles';
import Fridge from '../components/fridge.js';
import clientPromise from '../lib/mongodb_client.js';


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

export default function FridgeKitchen({ingredientOptions}) {

    //local storage fridge info
    const [userIngr, setUserIngr] = useState([]);

    //local storage kitchen info
    const [userApps, setUserApps] = useState([]);

    // 
    useEffect(() => {
        const thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getApps: {
                get() {
                    return this.kitchen
                },
            },
            getIngr: {
                get() {
                    return this.fridge
                }
            },
        });
        setUserIngr(thisUser.getIngr)
        setUserApps(thisUser.getApps);
    }, [])


    // for the tabs
    const theme = useTheme();
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
    // for search bars
    const [searchKitchen, setSearchKitchen] = useState("");
    const [idx, setIdx] = useState(-1);
    const handleChangeKitchen = e => {
        setSearchKitchen(e.target.value)
    }

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <Grid container sx={{ width: '100%' }}>
                    <Grid 
                        justifyContent='center'
                        sx={{ borderBottom: 1, borderColor: 'divider', width: windowSize[0] }}
                    >
                        <Tabs value={value} onChange={handleChange} variant="fullWidth">
                            <Tab label="Fridge" {...a11yProps(0)} />
                            <Tab label="Kitchen" {...a11yProps(1)} />
                        </Tabs>
                    </Grid>
                    <TabPanel value={value} index={0}>
                        <Fridge ingredientOptions={ingredientOptions}></Fridge>
                    
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        { /*search bar and edit button at the top*/ }
                        <Grid container>
                            <Grid item>
                                <TextField
                                    id="search-kitchen"
                                    label="Search"
                                    variant="outlined"
                                    sx={{
                                        width:  windowSize[0]/2
                                    }}
                                    onChange={handleChangeKitchen}
                                />
                                <Button 
                                    type="submit" 
                                    size="large"
                                    variant="contained"
                                    sx={{
                                        mx: 3,
                                        mt: 1,
                                    }}
                                    onClick={async () => {
                                        //search for appliance
                                        var idxx = await indexMatch(userApps, searchKitchen);
                                        //console.log(idxx)
                                        setIdx(idxx);
                                        //console.log("right after set, idx val:",idx);
                                    }}
                                >
                                    Enter
                                </Button>
                            </Grid>
                            <Grid item xs></Grid>
                            <Grid item>
                                <Button 
                                    type="submit" 
                                    size="large"
                                    variant="contained"
                                    sx={{
                                        mx: 2,
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
                            <Grid container sx={{ my: 2, }}>
                                <Typography>These are your owned appliances.</Typography>
                            </Grid>
                            <Grid container>
                                {userApps && userApps.map((app, index) => (
                                    <Box>
                                        <FormGroup row>
                                        </FormGroup>
                                        <Grid container>
                                            <Grid 
                                                item xs={12} 
                                                md={6}
                                                sx={{ width: windowSize[0],
                                                    backgroundColor: index === idx ? 'greenyellow' : 'white',
                                                }}
                                            >
                                                <List>
                                                    <ListItemText
                                                        sx={{display:'flex', justifyContent:'center'}}
                                                        primary={app} 
                                                    />
                                                </List>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}
                            </Grid>
                        </Grid>
                    
                    </TabPanel>
                </Grid>
            </div>
        </>
    );
}

async function indexMatch(array, q) {
    return array.findIndex(item => q.toUpperCase() === item.toUpperCase());
}

export async function getServerSideProps() {
    try {
        console.log("server side")
        const client = await clientPromise;
        const db = client.db("test");
        const ingredientOptions = await db
            .collection("ingredients")
            .find({})
            .toArray();
        return {
            props: {ingredientOptions: JSON.parse(JSON.stringify(ingredientOptions))},
        };
    }
    catch (e) {
        console.error(e);
    }
}