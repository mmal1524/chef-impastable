import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { useState } from "react";

export default function SignUp() {

    const [usernameValue, setValueUser] = useState("");
    const [passwordValue, setValuePass] = useState("");
    const [passwordValueC, setValuePassC] = useState("");
    const handleChangeUser = e => {
        setValueUser(e.target.value)
    }
    const handleChangePass = e => {
        setValuePass(e.target.value)
    }
    const handleChangePassC = e => {
        setValuePassC(e.target.value)
    }

    return (
        <Container component="main" maxWidth="auto">
            <Box
                sx={{
                    //marginTop: 2,
                    //width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            > 
                <Image src={"/chef-impastable-logo.jpg"} width={500} height={300} />
                <Typography component="h1" variant="h5" sx={{ mb: 1 }}>Sign Up!</Typography>
                <Box component="form" noValidate sx={{ my: 1 }} alignItems='center'>
                    <Grid>
                        <Box
                            component="form"
                            sx={{ mt: 1 }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField sx={{ width: 400 }} 
                            value={usernameValue} onChange={handleChangeUser}
                            id="username" label="Username" variant="outlined"/>
                        </Box>
                    </Grid>
                    <Grid>
                        <Box
                            component="form"
                            sx={{ mt: 2 }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField sx={{ width: 400 }} 
                            value={passwordValue} onChange={handleChangePass}
                            id="password" label="Password (security req)" variant="outlined"/>
                        </Box>
                    </Grid>
                    <Grid>
                        <Box
                            component="form"
                            sx={{ mt: 2 }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField sx={{ width: 400 }} 
                            value={passwordValueC} onChange={handleChangePassC}
                            id="confirm-password" label="Confirm Password" variant="outlined"/>
                        </Box>
                    </Grid>
                    <Box alignItems="center">
                        <Button 
                            type="submit" size="large" variant="contained" sx={{ my: 2, width: 400 }}
                            onClick={() => {
                                const res = RegUser(usernameValue, passwordValue);
                                console.log(JSON.stringify(res));
                            }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                    <Grid container>
                        <Grid item xs>
                        </Grid>
                        <Grid item xs>
                            <Link href="/" variant="body2">
                                {"Already have an account? Log in"}
                            </Link>
                        </Grid>
                     </Grid>
                </Box>
            </Box>
        </Container>

    );

    async function RegUser(username, password) {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        return res;
    }
}

