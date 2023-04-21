import React from "react";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getInitials } from "./user";
import SendIcon from '@mui/icons-material/Send';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useRouter } from "next/router";
import swal from 'sweetalert';


export function addFriendCard(friend, username) {
    
    const router = useRouter();
    
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
                    sx={{color:'green', borderColor: 'green'}}
                    onClick={async () => {
                        // determines if user has requested themselves
                        if (friend.username == username) {
                            swal("", "You cannot request yourself", "info");
                        } 
                        else {
                            // determines if user already has them in friends list
                            var alreadyFriends = await findFriend(username, friend.username);
                            if (alreadyFriends.success) {
                                swal("", "You're already friends with this user", "info")
                            }
                            else {
                                // determines if user has already requested them
                                var alreadyRequested = await findFriendRequest(friend.username, username);
                                if (alreadyRequested.success) {
                                    swal("", "You have already sent a friend request to this user", "info");
                                } else {
                                    var message = username + " has sent you a friend request!";
                                    var notif = await addNewFriendNotif(friend.username, message);
                                    var currUser = await addFriendRequest(friend.username, username);
                                    swal("", "Friend Request Sent!", "success");
                                }
                            }
                        }
                    }}

                    endIcon={<SendIcon />}
                >
                    Request
                </Button>
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

    async function findFriendRequest(username, friendRequest) {
        const res = await fetch('api/findFriendRequest', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                friendRequest: friendRequest
            })
        })
        const data = await res.json();
        return data;
    }

    async function findFriend(username, friend) {
        const res = await fetch('api/findFriend', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                friend: friend
            })
        })
        const data = await res.json();
        return data;
    }

    async function addFriendRequest(username, friendRequest) {
        const res = await fetch('api/addFriendRequest', {
            method: 'PUT',
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

  async function addNewFriendNotif(receiver, message) {
    const res = await fetch('api/addNewFriendNotif', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            receiver: receiver,
            message: message
        })
    });

    const data = await res.json();
    console.log(data)
    return data;
    }
}