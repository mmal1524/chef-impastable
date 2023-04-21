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
import { MenuSharp, Kitchen, Favorite, People, House, CalendarMonth, Add, Fullscreen, NotificationsNone } from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Box, TextField, IconButton, FormControlLabel } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Router from "next/router";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingList from './shopping-list';
import ShoppingListEdit from './shopping-list-edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationEdit from '../components/notification_edit';
import NotificationView from '../components/notification_view';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Checkbox from '@mui/material/Checkbox';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const Navbar = () => {
    const [displayName, setDisplayName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [username, setUsername] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [recipeResults, setRecipeResults] = useState([]);
    const [tagValue, setUserTags] = useState("");
    const [checkedItems, setCheckedItems] = useState([]);
    const [newFriendNotif, setNewFriendNotif] = useState([]);
    const [newSharedNotif, setNewSharedNotif] = useState([]);

    const handleChangeSearch = e => {
        setSearchValue(e.target.value)
    }

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
            getTags: {
                get() {
                    return this.dietaryTags
                },
            },
            getNewFriendNotif: {
                get() {
                    return this.newFriendNotif
                },
            },
            getNewSharedNotif: {
                get() {
                    return this.newSharedNotif
                },
            }
        });

        setDisplayName(thisUser.getDisplayName);
        setAvatar(thisUser.getAvatar);
        setUsername(thisUser.username);
        setUserTags(thisUser.getTags);
        setNewFriendNotif(thisUser.getNewFriendNotif);
        setNewSharedNotif(thisUser.getNewSharedNotif);
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openNav = Boolean(anchorEl);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [notificationList, setNotificationList] = React.useState([]);

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

    const [shopListPopup, setShopListPopup] = React.useState(false);
    const handleClickOpenShop = () => {
        setShopListPopup(true);
    };
    const handleCloseShop = () => {
        setShopListPopup(false);
    };
    const [shopListPopupEdit, setShopListPopupEdit] = React.useState(false);
    const handleClickOpenShopEdit = () => {
        setShopListPopupEdit(true);
    };
    const handleCloseShopEdit = () => {
        setShopListPopupEdit(false);
    };
    const closeViewOpenEdit = () => {
        setShopListPopup(false);
        setShopListPopupEdit(true);
    }
    const closeEditOpenView = () => {
        setShopListPopup(true);
        setShopListPopupEdit(false);
    }

    const [notifOpen, setNotifOpen] = React.useState(false);
    const handleNotifOpen = () => {
        setNotifOpen(true);
    }
    const closeNotif = () => {
        setNotifOpen(false);
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const logout = () => {
        localStorage.clear();
        router.push("/");
    }
    const router = useRouter();

    const sidebarIcons = [<People />, <House />, <Kitchen />, <CalendarMonth />, <Add />]
    const sidebarLinks = [{pathname:"/friends", query: {username: username}}, "/household", "/fridge-kitchen", "/mealplan-view", "/profile-page"]     // todo : change links for sidebar with routing
    const recipeTagOptions = [
        { value: "My Preferences"},
        { value: "Vegan"},
        { value: "Vegetarian"},
        { value: "Keto"},
        { value: "Kosher"},
        { value: "Paleo"},
        { value: "Pescetarian"},
        { value: "Halal"},
        { value: "Dairy Free"},
        { value: "Gluten Free"},
        { value: "Nut Free"},
        { value: "Wheat free"},
        { value: "Fish free"},
        { value: "Shellfish free"},
        { value: "Egg free"}]

    const [openDiet, setDiet] = React.useState(false);
    const handleClickOpenDiet = () => {
        setDiet(true);
    };
    const handleCloseDiet = () => {
        setDiet(false);
    };

    const handleSearch = async (searchValue, byFridge) => {
        try {
            router.push({
                pathname: "homepage",
                query: { searchTerm: searchValue, filters: checkedItems, byFridge: byFridge},
            });
        } catch (error) {
            console.log(error);
        }
    };

    function displayBell(friends, shares) {
        if (friends.length == 0 && shares.length == 0) {
            return (
                <div>
                    <Button 
                        data-test="Notification"
                        sx={{color: 'gray', ml: 1.0}}
                        startIcon={<NotificationsIcon style={{width:'25px', height: "25px"}} />}
                        onClick={async ()=> {
                                //var find = findNotifications(username);
                                console.log(notificationList);
                                handleNotifOpen();
                            }
                        }
                    >
                    </Button>
                </div>
            )
        } else {
            return (
                <div>
                    <Button 
                        data-test="New-Notification"
                        sx={{color: 'gray', ml: 1.5}}
                        startIcon={<NotificationsActiveIcon style={{width:'25px', height: "25px"}} />}
                        onClick={async ()=> {
                                //var find = findNotifications(username);
                                console.log(notificationList);
                                handleNotifOpen();
                            }
                        }
                    >
                    </Button>
                </div>
            )
        }
    }
 
    return (
        <Grid data-test="Navbar"
            container
            spacing={0}
            columns={25}
            sx={{ margin: 0, marginBottom: 3, width: '100%', borderBottom: 4, borderColor: 'Orange' }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Grid xs={1}>
                <React.Fragment key="left">
                    <IconButton data-test="DrawerButton" onClick={() => { setDrawerOpen(true) }}>
                        <MenuSharp />
                    </IconButton>
                    <Drawer data-test="Drawer" anchor="left" open={drawerOpen} onClose={() => { setDrawerOpen(false) }}>
                        <Box sx={{ width: 250 }}>
                            <List>
                                {["Friends", "Household", "Fridge & Kitchen", "Meal Plan", "Add Recipe"].map((text, index) => (
                                    <ListItem key={text}>
                                        <ListItemButton data-test={`Drawer-${index}`} onClick={() => { router.push(sidebarLinks[index]) }}>
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
            <Grid xs={1.0}
                sx={{
                    pt: 0.5,
                }
                }>
                <IconButton
                    aria-label="home button"
                    onClick={() => {
                        router.push("homepage");
                    }}
                >
                    <HomeIcon />
                </IconButton>
            </Grid>

            {/* Search Bar, npm i react-select */} 
            <Grid xs
                alignContent='center'
                sx={{
                    pt: 0.5,
                    display: 'inline-block'
                }}>
                <TextField
                    sx={{ minWidth: 800 }}
                    data-test="SearchBar"
                    size="small"
                    label="Search"
                    variant="outlined"
                    value={searchValue}
                    onChange={handleChangeSearch}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton aria-label="clear" onClick={async () => { setSearchValue("") }} edge="end">
                                    <ClearIcon />
                                </IconButton>

                                <IconButton data-test="searchFridge" aria-label="search" onClick={async () => { handleSearch(searchValue, true) }} edge="end">
                                    <Kitchen />
                                </IconButton>

                                <IconButton data-test="SearchButton" aria-label="search" onClick={async () => { handleSearch(searchValue, false) }} edge="end">
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }} 
                    />
                    &nbsp;
                <Button
                    type="AddTag" size="small" variant="contained" sx={{ minHeight: '40px' }}
                    onClick={() => {
                        handleClickOpenDiet();
                    }}
                    data-test='DietFilters'
                >Add Dietary Filters
                </Button>
            </Grid>
            
            <Grid xs={1}
                alignContent='center'
                sx={{
                    pt: 0.5,
                }}
            >
                <Button
                    data-test="ShopList"
                    sx={{color: 'gray', ml: 1.5}}
                    startIcon={<ShoppingBasketIcon style={{width:'25px', height: "25px"}}/>}
                    onClick={handleClickOpenShop}
                >
                </Button>
            </Grid>
            <Grid xs={1} 
                alignContent='center'
                sx={{ 
                    pt: 1, 
                }} 
            >
                {displayBell(newFriendNotif, newSharedNotif)}
            </Grid>
            <Grid xs={1}>
                <Button
                    data-test="Dropdown"
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
                        data-test="Profile"
                        onClick={() => {
                            Router.push({ pathname: "/profile-page/", query: { username: username } });
                        }}
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        data-test="DietaryRestrictions"
                        onClick={() => {
                            router.push("dietaryrestrictions");
                        }}
                    >
                        Dietary Restrictions
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            router.push({ pathname: "sharing-page", query: { username: username } });
                        }}
                    >
                        Shared Recipes
                    </MenuItem>
                    <MenuItem data-test="CreateRecipeNav"
                        onClick={() => {
                            router.push("createrecipe");
                        }}
                    >
                        Create Recipe
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

            {/* Dietary Filters popup */}
            <Dialog
                fullScreen={fullScreen}
                open={openDiet}
                onClose={handleCloseDiet}
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Filter by Dietary Restrictions"}
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        {recipeTagOptions.map((item) => (
                            <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                            data-test='checkbox'
                                            checked={checkedItems.includes(item.value) || (item.value === "My Preferences" && tagValue.length > 0 && Array.isArray(tagValue)
                                             && tagValue.every(tag => recipeTagOptions.filter(opt => opt.value !== "My Preferences").find(opt => opt.value === tag) && checkedItems.includes(tag)))}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    if (item.value === "My Preferences") {
                                                        setCheckedItems([
                                                            ...checkedItems.filter(item => item !== "My Preferences"), // remove "My Preferences" from the array
                                                            ...recipeTagOptions.filter(item => item.value !== "My Preferences" && tagValue.includes(item.value)) // add selected tags from tagValue
                                                                .map(item => item.value)
                                                        ]);
                                                        if (localStorage.getItem("user")) {
                                                            const dietaryTags = JSON.parse(localStorage.getItem("user")).dietaryTags;
                                                            if (Array.isArray(dietaryTags) && dietaryTags.length > 0) {
                                                                setUserTags(dietaryTags);
                                                                setCheckedItems((prev) => [
                                                                    ...new Set([...prev, ...dietaryTags]),
                                                                ]);
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        setCheckedItems((prev) => [...new Set([...prev, item.value])]);
                                                    }
                                                } else {
                                                    if (item.value === "My Preferences") {
                                                        setCheckedItems(
                                                            checkedItems.filter(item => !tagValue.includes(item) && item !== "My Preferences") // remove selected tags from tagValue and "My Preferences" from the array
                                                        );
                                                    } else {
                                                        setCheckedItems(
                                                            checkedItems.filter((value) => value !== item.value)
                                                        );
                                                    }
                                                }
                                            }}
                                        name={item.value}
                                        color="primary"
                                    />
                                }
                                label={item.value}
                            />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button data-test='CloseDietFilters'
                        onClick={handleCloseDiet} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
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
            <Dialog
                fullScreen={fullScreen}
                open={shopListPopup}

                onClose={handleCloseShop}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle>
                    {"Shopping List:"}
                </DialogTitle>
                <DialogContent data-test='ViewList'>
                    <ShoppingList />
                </DialogContent>
                <DialogActions>
                    <Button data-test='EditList' onClick={closeViewOpenEdit}>
                        {/* <Button onClick={function(event){handleCloseShop; handleClickOpenShopEdit;}}> */}
                        Edit
                    </Button>
                    <Button data-test='CloseView' onClick={handleCloseShop}>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullScreen={fullScreen}
                open={shopListPopupEdit}
                fullWidth={true}
                maxWidth={'sm'}

                onClose={handleCloseShop}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle>
                    {"Edit Shopping List:"}
                </DialogTitle>
                <DialogContent>
                    <ShoppingListEdit></ShoppingListEdit>
                </DialogContent>
                <DialogActions>
                    <Button data-test="BackToView" onClick={closeEditOpenView}>
                        Back to View
                    </Button>
                    <Button data-test='CloseEdit' onClick={handleCloseShopEdit}>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullScreen={fullScreen}
                open={notifOpen}
                onClose={closeNotif}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Notifications"}
                </DialogTitle>
                <DialogContent data-test='ViewNotifications'>
                    <NotificationEdit 
                        onClear={async () => {
                            setNewFriendNotif([]);
                            setNewSharedNotif([]);
                            // new one for each field
                            var data = await clearNotifications(username);
                            localStorage.setItem('user', JSON.stringify(data))}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeNotif} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}

async function clearNotifications(username) {
    try {
        const res = await fetch('/api/clearNotifs', {
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
    } catch {
        console.error("no notifications to clear");
    }
}

export default Navbar;
