import * as React from 'react';
import clientPromise from '../lib/mongodb'
import Link from 'next/link';
import Image from 'next/image';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useRouter } from "next/router";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Dialog, Grid, IconButton, InputLabel, OutlinedInput, Typography } from '@mui/material';


export async function getServerSideProps(context) {
  try {
    await clientPromise
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default function Home({
  isConnected,
}) {
    const [usernameValue, setValueUser] = useState("");
    const [passwordValue, setValuePass] = useState("");
    const handleChangeUser = e => {
        setValueUser(e.target.value)
    }
    const handleChangePass = e => {
        setValuePass(e.target.value)
    }
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = useState(false);


    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container component="main" maxWidth="auto">
            <Box
                sx={{
                    marginTop: 8,
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
                        <TextField data-test="UsernameField" sx={{ width: 400 }} value={usernameValue} id="username" label="Username" variant="outlined" onChange={handleChangeUser} />
                    </Box>
                </Grid>
                <Grid>
                <FormControl sx={{ mt: 1, width: 400 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                data-test="PasswordField"
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
                <Button
                    data-test="LoginButton"
                    type="Login" size="large" variant="contained" sx={{ mt: 3, mb: 2, width: 200 }}
                    onClick={ async () => {
                        var data = await LoginUser(usernameValue, passwordValue);
                        if (data.success == false) {
                            handleClickOpen();
                        } else {
                            console.log(data.fridge_grouped)
                            localStorage.setItem('user', JSON.stringify(data));
                            router.push("/homepage");
                        }
                    }}
                >Login
                </Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Incorrect User Credentials"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Your username and/or password is incorrect. Please try again.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                
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
        </Container >
    );

    async function LoginUser(username, password) {
        const res = await fetch('/api/loginapi', {
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
        const data = await res.json();
        return data;
    }
}
