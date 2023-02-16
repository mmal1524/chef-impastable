import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function SignUp() {
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
                <Typography component="h1" variant="h5" sx={{ my: 1 }}>Sign Up!</Typography>
                <Grid>
                    <Box
                        component="form"
                        sx={{ mt: 2 }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField sx={{ width: 400 }} id="username" label="Username" variant="outlined"/>
                    </Box>
                </Grid>
                <Grid>
                    <Box
                        component="form"
                        sx={{ mt: 2 }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField sx={{ width: 400 }} id="password" label="Password (security req)" variant="outlined"/>
                    </Box>
                </Grid>
                <Grid>
                    <Box
                        component="form"
                        sx={{ mt: 2 }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField sx={{ width: 400 }} id="confirm-password" label="Confirm Password" variant="outlined"/>
                    </Box>
                </Grid>
                <Button 
                    type="submit" size="large" variant="contained" sx={{ mt: 3, mb: 2, width: 200 }}
                    onClick={() => {
                        alert('clicked');
                    }}
                >
                    Sign Up
                </Button>
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
        </Container>

    );
}
