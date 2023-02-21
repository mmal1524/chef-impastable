import * as React from 'react';
import Box from '@mui/material/Box';
import { Dialog, Grid, IconButton, InputLabel, OutlinedInput, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useRouter } from 'next/router'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function SignUp() {

    const [usernameValue, setValueUser] = useState("");
    const [passwordValue, setValuePass] = useState("");
    const [passwordValueC, setValuePassC] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [openU, setOpenU] = useState(false);
    const [openP, setOpenP] = useState(false);
    const [openE, setOpenE] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();

    const handleChangeUser = e => {
        setValueUser(e.target.value)
    }
    const handleChangePass = e => {
        setValuePass(e.target.value)
    }
    const handleChangePassC = e => {
        setValuePassC(e.target.value)
    }
    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickOpenU = () => {
        setOpenU(true);
    };
    const handleClickOpenP = () => {
        setOpenP(true);
    };
    const handleClickOpenE = () => {
        setOpenE(true);
    };
    const handleCloseU = () => {
        setOpenU(false);
    };
    const handleCloseP = () => {
        setOpenP(false);
    };
    const handleCloseE = () => {
        setOpenE(false);
    };

    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

    return (
        <Container component="main" maxWidth="auto">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            > 
                <Image src={"/chef-impastable-logo.jpg"} alt="chef impastable logo" width={500} height={300} />
                <Typography component="h1" variant="h5" sx={{ mb: 1 }}>Sign Up!</Typography>
                <Box noValidate sx={{ my: 1 }} alignItems='center'>
                    <Grid>
                        <Box
                            component="form"
                            sx={{ mt: 1 }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField 
                            sx={{ width: 400 }} 
                            value={usernameValue} 
                            onChange={handleChangeUser}
                            id="username" 
                            label="Username" 
                            variant="outlined"
                            />
                        </Box>
                    </Grid>
                    <Grid>
                        <FormControl sx={{ mt: 1, width: 400 }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                onChange={handleChangePass}
                            />
                        </FormControl>
                    </Grid>
                    <Grid>
                        <FormControl sx={{ mt: 1, width: 400 }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                id="passwordC"
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="PasswordC"
                                onChange={handleChangePassC}
                            />
                        </FormControl>
                    </Grid>
                    <Box>
                        <Button 
                            type="submit" 
                            size="large" 
                            variant="contained" 
                            sx={{ my: 2, width: 400 }}
                            onClick={async () => {
                                var data1 = await CheckName(usernameValue);
                                if (!data1.success) {
                                    handleClickOpenU();
                                }

                                if ((passwordValue == passwordValueC) && strongPassword.test(passwordValue)) {
                                    var data2 = await RegUser(usernameValue, passwordValue);
                                    if (data2.success) {
                                        router.push('/profile-page');
                                    } else {
                                        handleClickOpenE();
                                    }
                                } else {
                                    handleClickOpenP();
                                }
                            }}
                        >
                            Sign Up
                        </Button>
                        <Dialog
                            fullScreen={fullScreen}
                            open={openU}
                            onClose={handleCloseU}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                {"Username Taken"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Your username is taken. Please try again.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseU} autoFocus>
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            fullScreen={fullScreen}
                            open={openP}
                            onClose={handleCloseP}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                {"Incorrect Password"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Your inputted passwords do not match or your passwords do not meet security requirements. 
                                    Your password must have at least 8 characters long, a lowercase letter, an uppercase letter, a symbol, and a number.
                                    Please try again.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseP} autoFocus>
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            fullScreen={fullScreen}
                            open={openE}
                            onClose={handleCloseE}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                {"Incorrect Password"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Error. User not created.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseE} autoFocus>
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Grid>
                            <Grid item xs></Grid>
                            <Grid item xs>
                                <Link href="/" variant="body2">
                                    { "Already have an account? Log in" }
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
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
                displayName: username,
            })
        })
        const data = await res.json();
        return data;
    }

    async function CheckName(username) {
        const res = await fetch('/api/find-username', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
            })
        })
        const data = await res.json();
        return data;
    }
}


