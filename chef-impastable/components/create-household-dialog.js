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


export default function CreateHouseholdDialog(props) {

    // for create household
    const [newHouseName, setNewHouseName] = useState("");
    const handleChangeNHN = e => {
        setNewHouseName(e.target.value)
    }
    const [username, setUsername] = useState(props.username);
    //local storage household info
    const [userHouses, setUserHouses] = useState(props.userHouses);
    const [friends, setFriends] = useState(props.friends);

    // for the tabs
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
            //console.log(newHouseID);
            // adding user to household
            var householdUpdated = await AddUsertoHousehold(newHouseID.householdID, username);
            //console.log(householdUpdated)
            // adding householdID to user's household
            var userUpdated = await AddHouseholdtoUser(username, newHouseID.householdID);
            //console.log(userUpdated);
            localStorage.setItem('user', JSON.stringify(userUpdated));
            for (let i = 0; i < sendList.length; i++) {
                var addUser = await AddUsertoHousehold(newHouseID.householdID, sendList[i]);
                var addHouse = await AddHouseholdtoUser(sendList[i], newHouseID.householdID);
            }
            props.onClose();
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
            <Dialog
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'sm'}
                open={props.open}
                onClose={props.onClose}
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
                    <Button onClick={props.onClose} autoFocus>
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


