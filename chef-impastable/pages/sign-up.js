import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Image from 'next/image';

export default function SignUp() {
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
                    Sign Up!
                </Typography>
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
            </Box>
        </Container>
 
    );
}
