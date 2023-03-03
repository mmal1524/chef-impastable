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
 
export function friendCardTwo(friend) {

    const router = useRouter();

    const [username, setUsername] = useState("");

    const [open, setOpen] = React.useState(false);

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
            }
        });
        setUsername(thisUser.getUsername)
    }, []);

    return (
        <Box sx={{margin: 1, marginLeft: 0}}>
            {/* Stack to display user's profile picture, display name, and username */}
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={3}
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
                    endIcon={<FullscreenIcon />}
                >
                    View
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
            method: 'DELETE',
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
        console.log(data);
        return data;
    }
}