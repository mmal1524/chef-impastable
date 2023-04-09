import React from "react";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getInitials } from "./user";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
 
export function friendRequestCard(friendRequest) {

    const router = useRouter();

    const [username, setUsername] = useState("");
    
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
                    alt={friendRequest.displayName} 
                    src={friendRequest.avatar} 
                >
                    {getInitials(friendRequest.displayName)}
                </Avatar>
                {/* Displays user's display name and username next to profile picture */}
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={0}
                >
                    <h3 className="displayName">{friendRequest.displayName}</h3>
                    <h5 className="username">{friendRequest.username}</h5>
                </Stack>
                <Button 
                    variant="outlined" 
                    sx={{color: 'green', borderColor: 'green'}}
                    onClick={async () => {

                        // adds friend to friend list
                        var currUser = await addFriend(username, friendRequest.username);

                        // removes friend from friend requests
                        currUser = await deleteFriendRequest(username, friendRequest.username);

                        // adds user to friend's friend list
                        await addFriend(friendRequest.username, username);
                        
                        localStorage.setItem('user', JSON.stringify(currUser));
                        router.reload();
                    }}
                >
                    Accept
                </Button>
                <Button 
                    variant="outlined" 
                    sx={{color: 'red', borderColor: 'red'}}
                    onClick={async () => {

                        // removes friend from friend requests
                        var currUser = await deleteFriendRequest(username, friendRequest.username);
                        
                        localStorage.setItem('user', JSON.stringify(currUser));
                        router.reload();
                    }}
                >
                    Decline
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

    async function addFriend(username, friend) {
        const res = await fetch('/api/addFriend', {
            method: 'PUT',
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

    async function deleteFriendRequest(username, friendRequest) {
        const res = await fetch('/api/deleteFriendRequest', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                friendRequest: friendRequest
            })
        });
        const data = await res.json();
        return data;
    }
}