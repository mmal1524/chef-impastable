import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { TextField, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox} from '@mui/material';
// import FormGroup from '@mui/material/FormGroup';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


export default function AddHouseholdFriendDialog(props) {
    // array of object ID of houses
    const [houses, setHouses] = useState([]);
    // array of objects of houses
    const [houseArr, setHouseArr] = useState([]);
    // array of object ID of houses that user is not a member
    const [availHousesID, setAvailHousesID] = useState([]);
    // array of object houses that user is not a member
    const [availHouses, setAvailHouses] = useState([]);
    //console.log(props);
    // after first render
    const [after, setAfter] = useState(false);

    // render for every household
    useEffect(() => {
        handleGetHouses();
        console.log(houseArr);
        if (props.open == true) {
            console.log("opened");
            console.log(houses);
            //handleGetHouses();
            createHouseList();
        }
        if (props.open == false) {
            console.log("clearing")
            ClearArray(houseArr);
        }
        //createHouseList();
        //console.log(availHouses);
    },[props]);
    // });

    //console.log(availFriends);

    const handleGetHouses = async () => {
        //ClearArray(houseArr);
        for (let i = 0; i < props.households.length; i++) {
            var house = await getHouseholdFromID(props.households[i]);
            setHouseArr(houseArr => [...houseArr, house]);
        }
        console.log(houseArr);
    }

    const createHouseList = async () => {
        //debugger;
        ClearArray(availHouses);
        ClearArray(availHousesID);
        console.log(availHouses);
        console.log(availHousesID);
        console.log(houseArr)
        
        for (let i = 0; i < houseArr.length; i++) {
            //console.log(houseArr[i].members);
            var idx = await indexMatch(houseArr[i].members, props.friend);
            var idxx = await indexMatchNum(availHousesID, props.households[i]);
            //console.log(availHousesID);
            if (idx == -1 && idxx == -1) {
                console.log("added")
                setAvailHousesID(availHousesID => [...availHousesID, props.households[i]])
                setAvailHouses(availHouses => [...availHouses, houseArr[i]]);
            }
        }
    }

    function ClearArray(array) {
        while (array.length > 0) {
            array.pop();
        }
    }

    // for the tabs
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    var [sendList, setSendList] = useState([]);

    const handleAdd = async () => {
        console.log(sendList)
        for (let i = 0; i < sendList.length; i++) {
            var addUser = await AddUsertoHousehold(sendList[i]._id, props.friend);
            console.log(addUser)
            var addHouse = await AddHouseholdtoUser(props.friend, sendList[i]._id);
            console.log(addHouse)
            // var idx = await indexMatch(availFriends, sendList[i]);
            // deleteByIndex(idx);
        }
        closeAction();
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

    const closeAction = () => {
        props.onClose();
        //setAfter(true);
    }

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'sm'}
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Choose Friends to Add to Household"}
                </DialogTitle>
                <DialogContent>
                    {/* {displayLoading(houseArr, availHouses)} */}
                    {displayHouses(availHouses)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAction} autoFocus>
                        Cancel
                    </Button>
                    <Button disabled={availHouses.length == 0 ? true : false}
                        onClick={handleAdd}
                        >Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );

    function displayLoading(houseArr, availHouses) {
        if (houseArr.length == 0) {
            return (<div>Loading...</div>);
        }
        else {
            return (<div>{displayHouses(availHouses)}</div>);
        }
    }

    function displayHouses(houseList) {
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

        sendList = []
        for (let j = 0; j < checked.length; j++) {
            sendList.push(houseList[checked[j]])
        }
      
        if (houseList.length == 0) {
            return(<>You have no available households to add this friend to.</>);
        } else {
            var houseListLength = new Array; 
            for (let i = 0; i < houseList.length; i++) {
                houseListLength.push(i);
            }
            return (
                <List sx={{ width: '100%', maxWidth: 360, maxHeight: 200, bgcolor: 'background.paper' }}>
                {houseListLength.map((value) => {
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
                        <ListItemText id={labelId} primary={`${houseList[value].name}`} />
                        </ListItemButton>
                    </ListItem>
                    );
                })}
                </List>
            );
        }
    }
}

async function indexMatch(array, q) {
    return array ? array.findIndex(item => q.toUpperCase() === item.toUpperCase()) : -1;
}
async function indexMatchNum(array, q) {
    return array ? array.findIndex(item => q === item) : -1;
}
