import Navbar from './navbar.js'
import * as React from 'react';
import User from '../components/user';
import { currUser } from '../components/user';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

export default function FriendsPage() {
    var friend1 = new User('Mahima', 'mahimasusername', "", [], []);
    var friend2 = new User('Jiahui', 'jiahuisusername', "", [], []);
    var friend3 = new User('Kendalyn', 'kendalynsusername', "", [], []);
    var friend4 = new User('Carmen', 'carmentsusername', "", [], []);
    var user = new User('Sarah Wagler', 'sawagler', "", [friend1, friend2, friend3], [friend4]);

    return (
        <div>
            <div>
                <Navbar /> 
            </div>
            <Grid container spacing={6}>
                <Grid xs={6}>
                <h3 className="h3">Search For Friends</h3>
                <Divider />
                <TextField
                    error
                    id="standard-error-helper-text"
                    label="Error"
                    defaultValue="Enter Username"
                    helperText="No users found"
                    variant="standard"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {<Grid container spacing={4} direction = "row">
                            {user.friends[0].displaySmall()}
                            {<Button variant="outlined" endIcon={<SendIcon />}>Request</Button>}
                            {<Button variant="outlined" endIcon={<FullscreenIcon />}>View</Button>} </Grid>}
                </Grid>
                <Grid xs={6}>
                    <Box sx={{width: '100%', marginBottom: 4}}>
                    <h3 className="h3">Friends List</h3>
                    <Divider />

                    <Grid container spacing={4} direction = "column">
                        {<Grid container spacing = {2} direction = "row">
                            {user.friends[0].displaySmall()}
                            {<Button variant="outlined" endIcon={<DeleteIcon />}>Remove</Button>}
                            {<Button variant="outlined" endIcon={<FullscreenIcon />}>View</Button>} </Grid>}

                        {<Grid container spacing = {2} direction = "row">
                            {user.friends[1].displaySmall()}
                            {<Button variant="outlined" endIcon={<DeleteIcon />} >Remove</Button>}
                            {<Button variant="outlined" endIcon={<FullscreenIcon />}>View</Button>} </Grid>}
                        
                        {<Grid container spacing = {2} direction = "row">
                            {user.friends[2].displaySmall()}
                            {<Button variant="outlined" endIcon={<DeleteIcon />}>Remove</Button>}
                            {<Button variant="outlined" endIcon={<FullscreenIcon />}>View</Button>} </Grid>}
                    </Grid>
                    </Box>
                    </Grid>
            </Grid>
        </div>
    );
}