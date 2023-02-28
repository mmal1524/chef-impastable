import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import User, { getInitials } from '../components/user';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from "next/router";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { MenuSharp, Kitchen, Favorite, People, House, CalendarMonth, Add } from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Box } from '@mui/material';
import Router from "next/router";


const Navbar = () => {

    const [displayName, setDisplayName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [username, setUsername] = useState("");
    useEffect(() => {
        var thisUser = JSON.parse(localStorage.getItem('user'));
        Object.defineProperties(thisUser, {
            getDisplayName: {
                get() {
                    return this.displayName
                },
            },
            getAvatar: {
                get() {
                    return this.avatar
                }
            },
        });

        setDisplayName(thisUser.getDisplayName);
        setAvatar(thisUser.getAvatar);
        setUsername(thisUser.username);
    }, []);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openNav = Boolean(anchorEl);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [openPopup, setOpen] = React.useState(false);
    const handleClickOpenPopup = () => {
        setOpen(true);
    };
    const handleClosePopup = () => {
        setOpen(false);
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const logout = () => {
        localStorage.clear();
        router.push("/");
    }
    const router = useRouter();

    const sidebarIcons = [<Favorite />, <People />, <House />, <Kitchen />, <CalendarMonth />, <Add />]
    const sidebarLinks = ["/profile-page", "/profile-page", "/profile-page", "/fridge-kitchen", "/profile-page", "/profile-page"]     // todo : change links for sidebar with routing


    return (
        <Grid container spacing={0} sx={{ margin: 0, marginBottom: 3, width: '100vw', borderBottom: 4, borderColor: 'Orange' }}>
            <Grid xs={11}>
                <React.Fragment key="left">
                    <IconButton onClick={() => { setDrawerOpen(true) }}>
                        <MenuSharp />
                    </IconButton>
                    <Drawer anchor="left" open={drawerOpen} onClose={() => { setDrawerOpen(false) }}>
                        <Box sx={{ width: 250 }}>
                            <List>
                                {["Saved", "Friends", "Household", "Fridge & Kitchen", "Meal Plan", "Add Recipe"].map((text, index) => (
                                    <ListItem key={text}>
                                        <ListItemButton onClick={() => { window.location.href = sidebarLinks[index] }}>
                                            <ListItemIcon>
                                                {sidebarIcons[index]}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Drawer>
                </React.Fragment>
            </Grid>
            <Grid xs={1}>
                <Button
                    variant="text"
                    sx={{ color: 'black' }}
                    aria-controls={openNav ? 'navbar' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openNav ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <Avatar
                        sx={{ width: 40, height: 40 }}


                        alt={displayName}
                        src={avatar}
                    >
                        {getInitials(displayName)}
                    </Avatar>
                </Button>
                <Menu
                    aria-labelledby="navbar"
                    anchorEl={anchorEl}
                    open={openNav}
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
                            Router.push({pathname:"/profile-page/", query: {username: username}});
                        }}
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            router.push("dietaryrestrictions");
                        }}
                    >
                        Dietary Restrictions
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleClickOpenPopup();
                            handleClose();
                        }}
                    >
                        Logout

                    </MenuItem>
                </Menu>
            </Grid>
            <Dialog
                fullScreen={fullScreen}
                open={openPopup}
                onClose={handleClosePopup}
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
                    <Button onClick={handleClosePopup} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );

    
}

export default Navbar;