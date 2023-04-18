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


export default function AddHouseholdDialog(props) {

    const [members, setMembers] = useState([]);
    const [availFriends, setAvailFriends] = useState([])
    //console.log(props);

    // render for every household
    useEffect(() => {
        setMembers(props.members);
        createFriendList();
        //console.log(availFriends);
    },[props]);

    const createFriendList = async () => {
        ClearArray(availFriends);
        for (let i = 0; i < props.friends.length; i++) {
            var idx = await indexMatch(members, props.friends[i]);
            var idxx = await indexMatch(availFriends, props.friends[i]);
            if (idx == -1 && idxx == -1) {
                //console.log("added")
                setAvailFriends(availFriends => [...availFriends, props.friends[i]]);
            }
        }
    }
    const deleteByIndex = index => {
        setAvailFriends(oldValues => {
            return oldValues.filter((_, i) => i !== index)
        })
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
        //console.log(sendList)
        for (let i = 0; i < sendList.length; i++) {
            var addUser = await AddUsertoHousehold(props.householdId, sendList[i]);
            //console.log(addUser)
            var addHouse = await AddHouseholdtoUser(sendList[i], props.householdId);
            //console.log(addHouse)
            var idx = await indexMatch(availFriends, sendList[i]);
            deleteByIndex(idx);
        }
        props.onClose();
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
                    {displayFriends(availFriends)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} autoFocus>
                        Cancel
                    </Button>
                    <Button disabled={availFriends.length == 0 ? true : false}
                    onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
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
            return(<>You have no friends to add :(</>);
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

async function indexMatch(array, q) {
    return array ? array.findIndex(item => q.toUpperCase() === item.toUpperCase()) : -1;
}
