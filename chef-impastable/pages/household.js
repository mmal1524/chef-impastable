import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { TextField, Grid } from '@mui/material';
import Navbar from './navbar.js'
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import ListItemText from '@mui/material/ListItemText';
// import FormGroup from '@mui/material/FormGroup';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { useTheme } from '@material-ui/core/styles';
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

export default function FridgeKitchen({ingredientOptions}) {

    //local storage fridge info
    const [userIngr, setUserIngr] = useState([]);

    //local storage kitchen info
    const [userApps, setUserApps] = useState([]);

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


    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <Grid>
                    <Typography>This is where you select each household to view</Typography>
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
        </>
    );
}
