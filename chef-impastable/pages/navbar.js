import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import User from '../components/user';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from "next/router";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Dialog } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {

    var user = new User('Sarah Wagler', 'sawagler', "", [], []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const logout = () => {
        router.push("/");
    }
    const router = useRouter();

    return (
        <Grid container spacing={0} sx={{ width: '100vw', border: 4, borderColor: 'Orange' }}>
            <Grid xs={11}>
                Navbar
            </Grid>
            <Grid xs={1}>
                <Button
                    variant="text"
                    sx={{ color: 'black' }}
                    aria-controls={open ? 'navbar' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Avatar
                        sx={{ width: 40, height: 40 }}
                        alt={user.displayName}
                        src={user.profilePicture}
                    >
                        {user.getInitials()}
                    </Avatar>
                </Button>
                <Menu
                    aria-labelledby="navbar"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            window.location.href = "/profile-page";
                        }}
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        onClick={(handleClickOpen) => {
                        }}
                    >
                        Logout

                    </MenuItem>
                </Menu>
            </Grid>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Logout Confirmation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={logout} autoFocus>
                        Yes
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

export default Navbar;