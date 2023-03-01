import React from "react";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getInitials } from "./user";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
 
export function friendCardTwo(friend) {

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
                >
                    Remove
                </Button>
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

}