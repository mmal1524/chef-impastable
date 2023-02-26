import * as React from 'react';
import { useState } from "react";
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import {getInitials} from '../components/user'
import Navbar from './navbar.js';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Divider } from '@mui/material';


export default function EditProfilePage() {

    var user = JSON.parse(localStorage.getItem('user'));

    const [displayNameValue, setValueDisplayName] = useState("Sarah");
    const handleChangeDisplayName = e => {
        setValueDisplayName(e.target.value)
    }

    const [crRecPriv, setValueCrRecPriv] = React.useState("everyone");
    const handleChangeCrRecPriv = (event) => {
        setValueCrRecPriv(event.target.value);
      };

    const [svRecPriv, setValueSvRecPriv] = React.useState("everyone");
    const handleChangeSvRecPriv = (event) => {
        setValueSvRecPriv(event.target.value);
    };

    const [revRecPriv, setValueRevRecPriv] = React.useState("everyone");
    const handleChangeRevRecPriv = (event) => {
        setValueRevRecPriv(event.target.value);
    };

    return (
        <>
           <div className="App">
                <Navbar />
            </div>
            <form noValidate autoComplete="off">
                <TextField required 
                    id="standard-required" 
                    label="Display Name" 
                    //defaultValue={user.displayName} 
                    value={displayNameValue}
                    onChange={handleChangeDisplayName}
                    sx={{padding: 2}}
                />
            </form>
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
                                value={crRecPriv}
                                onChange={handleChangeCrRecPriv}
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
                                value={svRecPriv}
                                onChange={handleChangeSvRecPriv}
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
                                value={revRecPriv}
                                onChange={handleChangeRevRecPriv}
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
                        onClick={() => {
                            
                        }}
                    >
                        Save
                    </Button>
                </Stack>
            </Stack>

        </>
    );
}