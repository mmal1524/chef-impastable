import * as React from 'react';
import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Navbar from './navbar.js';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Divider } from '@mui/material';
import { useRouter } from "next/router";
import SettingsIcon from '@mui/icons-material/Settings';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import { getInitials } from '../components/user';


export default function EditProfilePage() {

    const [username, setUsername] = useState("");
    var [displayName, setDisplayName] = useState("");
    var [avatar, setAvatar] = useState("");
    var [createdPrivacy, setCreatedPrivacy] = useState("");
    var [savedPrivacy, setSavedPrivacy] = useState("");
    var [reviewedPrivacy, setReviewedPrivacy] = useState("");

    const handleChangeDisplayName = e => {
        setDisplayName(e.target.value);
    }
    const handleChangeCreatedPrivacy = e => {
        setCreatedPrivacy(e.target.value);
    }
    const handleChangeSavedPrivacy = e => {
        setSavedPrivacy(e.target.value);
    }
    const handleChangeReviewedPrivacy = e => {
        setReviewedPrivacy(e.target.value);
    }

    // const [crRecPriv, setValueCrRecPriv] = useState("");
    // const handleChangeCrRecPriv = (event) => {
    //     setValueCrRecPriv(event.target.value);
    //   };


    // const [svRecPriv, setValueSvRecPriv] = useState(savedPrivacy);
    // const handleChangeSvRecPriv = (event) => {
    //     setValueSvRecPriv(event.target.value);
    // };

    // const [revRecPriv, setValueRevRecPriv] = useState(reviewedPrivacy);
    // const handleChangeRevRecPriv = (event) => {
    //     setValueRevRecPriv(event.target.value);
    // };
    
    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
        console.log(thisUser);
        Object.defineProperties(thisUser, {
            getUsername: {
                get() {
                    return this.username
                },
            },
            getDisplayName: {
                get() {
                    return this.displayName
                },
            },
            getAvatar: {
                get() {
                    return this.avatar
                },
            },
            getCreatedPrivacy: {
                get() {
                    return this.createdPrivacy
                },
            },
            getSavedPrivacy: {
                get() {
                    return this.savedPrivacy
                },
            },
            getReviewedPrivacy: {
                get() {
                    return this.reviewedPrivacy
                },
            }
        });
        setUsername(thisUser.getUsername);
        setDisplayName(thisUser.getDisplayName);
        setAvatar(thisUser.getAvatar);
        setCreatedPrivacy(thisUser.getCreatedPrivacy);
        setSavedPrivacy(thisUser.savedPrivacy);
        setReviewedPrivacy(thisUser.reviewedPrivacy);
    }, []);

    console.log(displayName);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const router = useRouter();

    return (
        <>
           <div className="App">
                <Navbar />
            </div>
            <Grid container spacing={2}>
                <Grid xs={10}>
                    {/* Avatar */}
                    <Button component="label">
                        {/*<input hidden id="upload-avatar-pic" accept="image/*" type="file" />*/}
                        <Avatar
                            sx={{ width: 100, height: 100 }}
                            alt={displayName}
                            src={avatar}
                        >
                            {getInitials(displayName)}
                        </Avatar>
                    </Button>
                    <p></p>
                    {/* Display name field */}
                    <form noValidate autoComplete="off">
                        <TextField required 
                            id="standard-required" 
                            label="Display Name" 
                            value={displayName}
                            onChange={handleChangeDisplayName}
                            sx={{marginTop: 2}}
                        />
                    </form>
                </Grid>
                <Grid xs={2}>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                        {/* Reset password button */}
                        <Button 
                            variant="outlined" 
                            startIcon={<SettingsIcon />} 
                            sx={{color: 'black', borderColor: 'black'}}
                            onClick={() => {
                                //router.push to reset password page
                            }}
                        >
                            Reset Password
                        </Button>
                        {/* Delete account button */}
                        <Button 
                            variant="outlined" 
                            startIcon={<SettingsIcon />} 
                            sx={{color: 'red', borderColor: 'red'}}
                            onClick={handleClickOpen}
                        >
                            Delete Account
                        </Button>
                        {/* Pop up */}
                        <Dialog
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogTitle id="delete-account">
                                {"Delete Account?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="delete-account-description">
                                    This action is permanent. It cannot be undone.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                {/* Delete account */}
                                <Button onClick={handleClose}
                                    sx={{color: 'red'}}
                                >
                                    Delete Account
                                </Button>
                                {/* Close pop up*/}
                                <Button onClick={handleClose} autoFocus>
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Stack>
                </Grid>
            </Grid>
            <Divider sx={{marginTop: 3, marginBottom: 3}}></Divider>
            <Stack 
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={2}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Box>
                        Can view created recipes
                    </Box>
                    <Box sx={{width:300}}>
                        <FormControl variant="filled" sx={{ m: 4, p: 4, minWidth: 120 }}>
                            <InputLabel id="created"></InputLabel>
                            <Select
                                value={createdPrivacy}
                                onChange={handleChangeCreatedPrivacy}
                            >
                                <MenuItem value={"everyone"}>Everyone</MenuItem>
                                <MenuItem value={"friends only"}>Friends Only</MenuItem>
                                <MenuItem value={"nobody"}>Nobody</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Box>
                        Can view saved recipes
                    </Box>
                    <Box sx={{width:300}}>
                        <FormControl variant="filled" sx={{ m: 4, p: 4, minWidth: 120 }}>
                            <InputLabel id="saved"></InputLabel>
                            <Select
                                value={savedPrivacy}
                                onChange={handleChangeSavedPrivacy}
                            >
                                <MenuItem value={"everyone"}>Everyone</MenuItem>
                                <MenuItem value={"friends only"}>Friends Only</MenuItem>
                                <MenuItem value={"nobody"}>Nobody</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Box>
                        Can view reviewed recipes
                    </Box>
                    <Box sx={{width:300}}>
                        <FormControl variant="filled" sx={{ m: 4, p: 4, minWidth: 120 }}>
                            <InputLabel id="reviewed"></InputLabel>
                            <Select
                                value={reviewedPrivacy}
                                onChange={handleChangeReviewedPrivacy}
                            >
                                <MenuItem value={"everyone"}>Everyone</MenuItem>
                                <MenuItem value={"friends only"}>Friends Only</MenuItem>
                                <MenuItem value={"nobody"}>Nobody</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Button 
                        variant="outlined"
                        sx={{color: 'black', borderColor: 'black'}}
                        onClick={async () => {
                            var data = await updateUser(username, displayName, createdPrivacy,
                                                        savedPrivacy, reviewedPrivacy);
                            localStorage.setItem('user', JSON.stringify(data));
                            console.log(data);
                            router.push({pathname:"/profile-page/", query: {username: username}});
                        }}
                    >
                        Save
                    </Button>
                </Stack>
            </Stack>

        </>
    );

    async function updateUser(username, newDisplayName, newCreatPriv, newSavPriv, newRevPriv) {
        console.log(username);
        const res = await fetch('/api/updateUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                newDisplayName: newDisplayName,
                newCreatPriv: newCreatPriv,
                newSavPriv: newSavPriv,
                newRevPriv: newRevPriv
            })
        });
        const data = await res.json();
        console.log(data);
        return data;
    }
}