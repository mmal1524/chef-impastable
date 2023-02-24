import * as React from 'react';
import { Container, Box, Typography, Grid, TextField, Button } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from "react"
import { useRouter } from "next/router"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function SignUp() {

    const [oldPassValue, setValueOld] = useState("");
    const [newPassValue, setValuePass] = useState("");
    const [newPassValueC, setValuePassC] = useState("");
    const [openP, setOpenP] = useState(false);
    const [openO, setOpenO] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();

    const handleChangeOld = e => {
        setValueOld(e.target.value)
    }
    const handleChangePass = e => {
        setValuePass(e.target.value)
    }
    const handleChangePassC = e => {
        setValuePassC(e.target.value)
    }
    const handleCloseP = () => {
        setOpenP(false);
    };
    const handleCloseO = () => {
        setOpenO(false);
    };


    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s])(?=.{8,})')
    let whiteSpace = new RegExp("/^\s+$/");

    return (
        <Container 
            component="main" 
            maxWidth="auto" 
            sx={{
                my: 1
            }}
        >
            <Box 
                sx={{
                    my: 1,
                    height: 150,
                    displayColor: 'pink',
                }}
            >                
            </Box>
            <Box
                alignItems='center'
                justify='center'
                display='flex'
                sx={{
                    flexDirection: 'column',
                    my: 1,
                    //backgroundColor: 'gold',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 1 }}>Reset Password</Typography>
                <Box 
                    noValidate 
                    sx={{ my: 1 }} 
                    alignItems='center' 
                    justifyItems='center'
                    //maxWidth='60%'
                >
                    <Grid>
                        <Box
                            component="form"
                            sx={{ mt: 1 }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField 
                                sx={{ width: 400 }} 
                                value={oldPassValue} 
                                onChange={handleChangeOld}
                                id="old-pw" 
                                label="Old Password" 
                                variant="outlined"
                            />
                        </Box>
                    </Grid>
                    <Grid>
                        <Box
                            component="form"
                            sx={{ mt: 1 }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField 
                                sx={{ width: 400 }} 
                                value={newPassValue} 
                                onChange={handleChangePass}
                                id="new-pw" 
                                label="New Password" 
                                variant="outlined"
                            />
                        </Box>
                    </Grid>
                    <Grid>
                        <Box
                            component="form"
                            sx={{ mt: 1 }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField 
                                sx={{ width: 400 }} 
                                value={newPassValueC} 
                                onChange={handleChangePassC}
                                id="new-pw" 
                                label="Confirm New Password" 
                                variant="outlined"
                            />
                        </Box>
                    </Grid>
                    <Box 
                        sx={{ 
                            whiteSpace: 'normal',
                            textAlign: 'center',
                            my: 2,
                            mx: 'auto',
                            width: 400
                        }} 
                    >
                        Password Requirements: At least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 symbol, and 1 number.
                    </Box>
                    <Box>
                        <Button 
                            type="submit" 
                            size="large" 
                            variant="contained" 
                            sx={{ my: 1, width: 400 }}
                            onClick={async () => {
                                if ((newPassValue == newPassValueC) && strongPassword.test(newPassValue) && (whiteSpace.test(newPassValue))) {

                                } else {
                                    handleCloseP();
                                }
                            }}
                        >
                            Reset Password
                        </Button>
                        <Dialog
                            fullScreen={fullScreen}
                            open={openP}
                            onClose={handleCloseP}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                {"Incorrect New Password"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Your new passwords do not match or your password does not meet security requirements.
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
                            open={openO}
                            onClose={handleCloseO}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                {"Incorrect Old Password"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Your inputted password does not match your old password.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseO} autoFocus>
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Box>
            </Box>
        </Container>

    );

    // async connect db check if old password correct
    async function CheckOldCorrect(oldPassValue) {
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


