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

export default function LeaveHouseholdDialog(props) {

    const router = useRouter();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const members= useState(props.members)
    //console.log(props.householdId);

    const handleLeave = async () => {
        // remove user from household
        console.log(members.length);
        var householdUpdated = await DeleteUserFromHousehold(props.householdId, props.username);
        var userUpdated = await DeleteHouseholdFromUser(props.username, props.householdId);
        // update local storage
        localStorage.setItem('user', JSON.stringify(userUpdated));

        //if household empty, delete household
        console.log(members.length)
        if (members.length <= 1) {
            console.log("entered");
            var success = await DeleteHousehold(props.householdId);
        }
        props.onClose();
        router.push("/household");
    }

    async function DeleteHousehold(householdID) {
        const res = await fetch('api/deleteHousehold', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                householdID: householdID,
            })
        });
        const data = await res.json();
        return data;
    }

    async function DeleteUserFromHousehold(householdID, username) {
        const res = await fetch('api/deleteUserFromHousehold', {
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

    async function DeleteHouseholdFromUser(username, householdID) {
        const res = await fetch('api/deleteHouseholdFromUser', {
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
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Leave Household"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to leave this household?
                        If you are the only member of the household, the household will be deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLeave} autoFocus>
                        Yes
                    </Button>
                    <Button onClick={props.onClose} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}