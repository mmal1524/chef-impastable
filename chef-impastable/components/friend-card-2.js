import React from "react";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getInitials } from "./user";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddHouseholdFriendDialog from '../components/add-households-to-friend-dialog.js'

// for add friend to households
import {House} from '@mui/icons-material';
 
export function friendCardTwo(friend) {

    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState("");
    const [households, setHouseholds] = useState([]);
    var [createdPrivacy, setCreatedPrivacy] = useState("");
    var [savedPrivacy, setSavedPrivacy] = useState("");
    var [reviewedPrivacy, setReviewedPrivacy] = useState("");
    var [mealPlanPrivacy, setMealPlanPrivacy] = useState("");
    const [open, setOpen] = useState(false);

    const [openAddH, setOpenAddH] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getUsername: {
                get() {
                    return this.username
                },
            },
            getHouses: {
                get() {
                    return this.households
                }
            }
        });
        setUsername(thisUser.getUsername)
        setHouseholds(thisUser.getHouses)
    }, []);

    return (
        <Box sx={{margin: 1, marginLeft: 0}}>
            {/* Stack to display user's profile picture, display name, and username */}
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
            >
                {/* Profile Picture, if no url, displays user's initials */}
                <Avatar 
                    sx={{width: 40, height: 40}} 
                    alt={friend.displayName} 
                    src={friend.avatar} 
                >
                    {getInitials(friend.displayName)}
                </Avatar>
                {/* Displays user's display name and username next to profile picture */}
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={0}
                >
                    <h3 className="displayName">{friend.displayName}</h3>
                    <h5 className="username">{friend.username}</h5>
                </Stack>

                <Button 
                    variant="outlined" 
                    sx={{color:'red', borderColor: 'red'}}
                    endIcon={<DeleteIcon />}
                    onClick={handleClickOpen}
                > 
                    Remove
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle id="remove-friend">
                        {"Remove This User?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="remove-friend-description">
                            If you change your mind, you'll have to request to be friends again.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={async () => {

                                // removes friend from friend list
                                var currUser = await deleteFriend(username, friend.username);

                                // remove user from friend's friend list
                                await deleteFriend(friend.username, username);

                                localStorage.setItem('user', JSON.stringify(currUser));
                                router.reload();

                                swal("Friend Removed");
                                }}
                                    sx = {{color: 'red'}}
                                > 
                                    Remove Friend
                                </Button>
                                <Button onClick={handleClose} autoFocus>
                                    Cancel
                                </Button>
                        </DialogActions>
                    </Dialog>
                <Button 
                    variant="outlined" 
                    sx={{color:'blue', borderColor:'blue'}}
                    endIcon={<FullscreenIcon />}
                    onClick={ async () => {
                        var friendUser = await viewFriend(friend.username);
                        router.push({pathname: "/view_friends", query: {username: friendUser.username} })
                       }}
                >
                    View
                </Button>
                <AddHouseholdFriendDialog
                    username={username}
                    friend={friend.username}
                    households={households}
                    open={openAddH}
                    onClose={() => {setOpenAddH(false)}}
                />
                <Button 
                    variant="outlined" 
                    sx={{color:'darkorange', borderColor:'darkorange'}}
                    endIcon={<House />}
                    onClick={() => {setOpenAddH(true)}}
                >
                    Add to Households
                </Button>

            </Stack> 
            <style jsx>{`
                .displayName {
                    margin: 0px;
                }
                .username {
                    margin: 0px;
                }
            `}</style>
        </Box>

    );

    async function deleteFriend(username, friend) {
        const res = await fetch('/api/deleteFriend', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                friend: friend
            })
        });
        const data = await res.json();
        return data;
    }

    async function viewFriend(friend) {
        const res = await fetch('/api/finduser', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: friend,
            })
    })
    const friendJSON = await res.json();
    return friendJSON;
  } 
}