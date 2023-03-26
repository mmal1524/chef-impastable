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
    const [openN, setOpenN] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [openS, setOpenS] = useState(false);
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
    const handleCloseN = () => {
        setOpenN(false);
    };
    const handleCloseE = () => {
        setOpenE(false);
    };
    const handleCloseS = () => {
        setOpenS(false);
        router.push('/profile-page');
    };
    const handleClickOpenP = () => {
        setOpenP(true);
    };
    const handleClickOpenO = () => {
        setOpenO(true);
    };
    const handleClickOpenN = () => {
        setOpenN(true);
    };
    const handleClickOpenE = () => {
        setOpenE(true);
    };
    const handleClickOpenS = () => {
        setOpenS(true);
    };
    
    const thisUser = JSON.parse(localStorage.getItem('user'));
    Object.defineProperties(thisUser, {
        getPass: {
            get() {
                return this.password
            },
        }, 
        getUsername: {
            get() {
                return this.username
            }
        },
    });
    console.log(thisUser);
    console.log(thisUser.getPass);

    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])(?=.{8,})')
    let passwordRegex = /^[A-Za-z\d@$!%*?&]+$/;

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
                                console.log("button clicked")
                                console.log(thisUser.getPass);
                                if (thisUser.getPass === oldPassValue) {
                                    //console.log(thisUser.getPass)
                                    if (newPassValue != oldPassValue) {
                                        if ((newPassValue == newPassValueC) && strongPassword.test(newPassValue) && (passwordRegex.test(newPassValue))) {
                                            //console.log("change now")
                                            var data = await EditPw(thisUser.getUsername, newPassValue);
                                            if (data.success != false) {
                                                localStorage.setItem('user', JSON.stringify(data));
                                                handleClickOpenS();
                                                router.push('/edit-profile');
                                            } else {
                                                handleClickOpenE();
                                            }
                                        } else {
                                            handleClickOpenP();
                                        }
                                    } else {
                                        handleClickOpenN();
                                    }
                                } else {
                                    handleClickOpenO();
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
                        <Dialog
                            fullScreen={fullScreen}
                            open={openN}
                            onClose={handleCloseN}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                {"No Change Necessary"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Your old and new password match. There is no need for change.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseN} autoFocus>
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
                                {"Error"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Error. Failed to change Password.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseE} autoFocus>
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            fullScreen={fullScreen}
                            open={openS}
                            onClose={handleCloseS}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                {"Success"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Password Changed
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseS} autoFocus>
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                    <Box>
                        <Button 
                            type="submit" 
                            size="large" 
                            variant="contained" 
                            sx={{ my: 1, width: 400 }}
                            onClick={async () => {
                                console.log("button clicked");
                                router.push('/edit-profile');
                            }}
                        >
                            Return to Edit Profile
                        </Button>
                    </Box>    
                </Box>
            </Box>
        </Container>

    );

    async function EditPw(username, password) {
        const res = await fetch('/api/change-password', {
            method: 'PUT',
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


