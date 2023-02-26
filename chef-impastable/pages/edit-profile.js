import * as React from 'react';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import {getInitials} from '../components/user'
import Navbar from './navbar.js';

import Button from '@mui/material/Button';

export default function EditProfilePage() {

    var user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <div className="App">
                    <Navbar />
                </div>
                <p></p>
                <Grid container spacing={6}>
                    <Grid xs={10}>
                        {/* Displaying user's profile picture, name, and username */}
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={3}
                        >
                            {/* Profile Picture, if no url, displays user's initials */}
                            
                            <Avatar 
                                sx={{width: 85, height: 85}} 
                                alt={user.displayName} 
                                src={user.avatar} 
                            >
                                {getInitials(user.username)}
                            </Avatar>
                            {/* Displays user's display name and username next to profile picture */}
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="stretch"
                                spacing={0}
                            >
                                <Button
                                    onClick={() => {
                                        
                                    }}
                                >
                                    <h1 className="displayName">{user.displayName}</h1>
                                </Button>
                                <h3 className="username">{user.username}</h3>
                            </Stack>

                        </Stack>

                        <style jsx>{`
                            .displayName {
                                margin: 0px;
                            }
                            .username {
                                margin: 0px;
                            }
                        `}</style>
                    </Grid>
                    <Grid xs={2}>
                        {/* Edit profile button */}
                        <Button 
                            variant="outlined" 
                            startIcon={<SettingsIcon />} 
                            sx={{color: 'black', borderColor: 'black'}}
                            onClick={() => {
                                window.location.href="/edit-profile";
                            }}
                        >
                            Edit Profile
                        </Button>
                    </Grid>
                </Grid>
        </>
    );
}