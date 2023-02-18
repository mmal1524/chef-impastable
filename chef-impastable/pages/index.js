import Head from 'next/head'
import * as React from 'react';
import clientPromise from '../lib/mongodb'
import Link from 'next/link';
import Image from 'next/image';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState } from "react";
import { useRouter } from "next/router";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


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
        //console.log(`Typed => ${e.target.value}`);
        setValueUser(e.target.value)
    }
    const handleChangePass = e => {
        //console.log(`Typed => ${e.target.value}`);
        setValuePass(e.target.value)
    }
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
                        <TextField sx={{ width: 400 }} input type = "password" value={passwordValue} id="password" label="Password" variant="outlined" onChange={handleChangePass} />
                    </Box>
                </Grid>
                <Button
                    type="Login" size="large" variant="contained" sx={{ mt: 3, mb: 2, width: 200 }}
                    onClick={async () => {
                        var data = await LoginUser(usernameValue, passwordValue);
                        if (data.success) {
                            router.push("/");
                        } else {
                            handleClickOpen();
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
