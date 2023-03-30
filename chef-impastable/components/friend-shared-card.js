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
import ForumIcon from '@mui/icons-material/Forum';
 
export function friendShared(friend) {

    const router = useRouter();

    const [username, setUsername] = useState("");
    
    const [open, setOpen] = React.useState(false);
    const [noFriendsOpen, setNoFriendsOpen] = React.useState(false);

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
                    sx={{color:'light blue', borderColor:'light blue'}}
                    endIcon={<ForumIcon />}
                    onClick={ async () => {
                        var friendUser = await viewFriend(friend.username);
                        router.push({pathname: "/sharing-page", query: {username: username, friendusername: friendUser.username} })
                    }}
                >
                    shared
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
    console.log('data')
    console.log(friendJSON)
    return friendJSON;
  } 
}