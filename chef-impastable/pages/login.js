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
    const handleChangeUser = e => {
        //console.log(`Typed => ${e.target.value}`);
        setValueUser(e.target.value)
    }
    const handleChangePass = e => {
        //console.log(`Typed => ${e.target.value}`);
        setValuePass(e.target.value)
    }
    return (
        <Container component="main" maxWidth="auto">
            <Box
                sx={{
                    marginTop: 8,
                    //width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            > 
                <Image src={"/chef-impastable-logo.jpg"} width={500} height={300} />
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Grid>
                    <Box
                        component="form"
                        sx={{ mt: 2 }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField sx={{ width: 400 }} value={usernameValue} id="username" label="Username" variant="outlined" onChange={handleChangeUser} />
                    </Box>
                </Grid>
                <Grid>
                    <Box
                        component="form"
                        sx={{ mt: 2 }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField sx={{ width: 400 }} value={passwordValue} id="password" label="Password" variant="outlined" onChange={handleChangePass}/>
                    </Box>
                </Grid>
           <Button 
              type="Login" size="large" variant="contained" sx={{ mt: 3, mb: 2, width: 200 }}
                              onClick={() => {
                                console.log(usernameValue);
                        alert('clicked');
                    }}
                >Sign Up
            </Button>
            <Grid container>
            <Grid item xs>
              </Grid>
              <Grid item xs>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            </Box>
        </Container>
    );
}