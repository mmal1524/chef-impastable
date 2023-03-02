import * as React from 'react';
import { useState, useEffect, createRef } from "react";
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
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

//https://gist.github.com/Pacheco95/aa5c28b7a61dacba5b8f55f84d1fa591

export default function EditProfilePage() {

    const [username, setUsername] = useState("");
    var [displayName, setDisplayName] = useState("");
    var [avatar, setAvatar] = useState("");
    var [createdPrivacy, setCreatedPrivacy] = useState("");
    var [savedPrivacy, setSavedPrivacy] = useState("");
    var [reviewedPrivacy, setReviewedPrivacy] = useState("");
    var [mealPlanPrivacy, setMealPlanPrivacy] = useState("");

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
    const handleChangeMealPlanPrivacy = e => {
        setMealPlanPrivacy(e.target.value);
    }

    const inputFileRef = createRef(null);
    const cleanup = () => {
        URL.revokeObjectURL(avatar);
        inputFileRef.current.value = null;
    };
    const setAv = (newAvatar) => {
        if (avatar) {
          cleanup();
        }
        setAvatar(newAvatar);
    };
    const handleOnChange = (event) => {
        const newAvatar = event.target?.files?.[0];
    
        if (newAvatar) {
          setAv(URL.createObjectURL(newAvatar));
        }
    };
    const handleClick = (event) => {
        if (avatar) {
          event.preventDefault();
          setAv(null);
        }
    };

    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
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
            },
            getMealPlanPrivacy: {
                get() {
                    return this.mealPlanPrivacy
                }
            }
        });
        setUsername(thisUser.getUsername);
        setDisplayName(thisUser.getDisplayName);
        setAvatar(thisUser.getAvatar);
        setCreatedPrivacy(thisUser.getCreatedPrivacy);
        setSavedPrivacy(thisUser.savedPrivacy);
        setReviewedPrivacy(thisUser.reviewedPrivacy);
        setMealPlanPrivacy(thisUser.getMealPlanPrivacy)
    }, []);

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
                    <Avatar
                        sx={{ width: 100, height: 100 }}
                        alt={displayName}
                        src={avatar}
                        imgProps={{
                            style: {
                                maxHeight: "100%",
                                maxWidth: "100%",
                                objectFit: "cover",
                            },
                        }}
                    >
                        {getInitials(displayName)}
                    </Avatar>
                    <Fragment>
                    <label htmlFor="icon-button-photo">
                        <Button
                            variant="contained"
                            color="primary"
                            component="label"
                            mb={2}
                            onClick={handleClick}
                        >
                            {avatar ? <DeleteIcon /> : <FileUploadIcon />}
                            <input
                                ref={inputFileRef}
                                accept="image/*"
                                hidden
                                id="avatar-image-upload"
                                type="file"
                                onChange={handleOnChange}
                            />
                        </Button>
                    </label>
                    </Fragment>
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
                                router.push('/reset-password');
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
                                <Button onClick={async () => {
                                    // remove user from all friend lists
                                    await deleteFromFriends(username);
                                    console.log("deleted from friends lists");

                                    // remove user from all friendRequests lists
                                    await deleteFromFriendRequests(username);
                                    console.log("deleted from friend requests lists");

                                    // remove user from database
                                    await deleteUser(username);
                                    console.log("deleted user");

                                    router.push('/');
                                }}
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
                    <Box>
                        Can view meal plans
                    </Box>
                    <Box sx={{width:300}}>
                        <FormControl variant="filled" sx={{ m: 4, p: 4, minWidth: 120 }}>
                            <InputLabel id="meal plans"></InputLabel>
                            <Select
                                value={mealPlanPrivacy}
                                onChange={handleChangeMealPlanPrivacy}
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
                            var data = await updateUser(username, displayName, avatar, createdPrivacy,
                                                        savedPrivacy, reviewedPrivacy, mealPlanPrivacy);
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

    async function deleteFromFriends(username) {
        const res = await fetch('/api/deleteFriendAll', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username
            })
        });
        const data = await res.json();
        return data;
    }

    async function deleteFromFriendRequests(username) {
        const res = await fetch('/api/deleteFriendRequestsAll', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username
            })
        });
        const data = await res.json();
        return data;
    }

    async function deleteUser(username) {
        const res = await fetch('/api/deleteUser', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username
            })
        });
        const data = await res.json();
        return data;
    }

    async function updateUser(username, newDisplayName, newAvatar, newCreatPriv, newSavPriv, newRevPriv, newMealPriv) {
        const res = await fetch('/api/updateUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                newDisplayName: newDisplayName,
                newAvatar: newAvatar,
                newCreatPriv: newCreatPriv,
                newSavPriv: newSavPriv,
                newRevPriv: newRevPriv,
                newMealPriv: newMealPriv
            })
        });
        const data = await res.json();
        console.log(data);
        return data;
    }
}