import { Outlet, useLocation, useNavigate } from "react-router-dom";
//import AppBar from '@mui/material/AppBar';
import {
    AppBar, Box, IconButton, Toolbar, Typography, Menu, MenuItem,
    ListItemIcon, Snackbar, ListItemText, BottomNavigation, BottomNavigationAction,
    Paper, Modal, CircularProgress
} from "@mui/material";

import Profile from "@mui/icons-material/AccountCircleRounded";
import Buddies from "@mui/icons-material/People";
import Discover from "@mui/icons-material/Search";
import Setting from "@mui/icons-material/Settings";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";

import EditIcon from "@mui/icons-material/EditAttributesRounded";
import { logOutUser, loadUserData } from '../app/userDataSlice';
import { closeSnackbar, reRouteRequest, toggleBlockView } from '../app/routeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, getProfile, logOut } from "./rootLayoutLogic";
import { useMemo, useState } from "react";
import { remoteRequest } from "../app/model";
import Logout from "@mui/icons-material/Logout";
import { openSnackbar } from '../app/routeSlice';

function RootLayout() {
    const userInfo = useSelector(state => state.userData);
    const snackBarOpen = useSelector(state => state.route.showSnackbar);
    const message = useSelector(state => state.route.snackbarMessage);
    const severity = useSelector(state => state.route.snackbarSeverity);
    const blockView = useSelector(state => state.route.blockView)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState({
        openSettingMenu: false, menuAnchor: null,
        snackbar: {
            open: false, message: '', severity: '', autoHideDuration: 6000,
        }
    });

    const updateState = (newValue) => {
        setState((previousValue) => { return { ...previousValue, ...newValue } });
    }

    useMemo(() => {
        //retrieve user's username from localStorage and keeps it in redux store
        const data = JSON.parse(localStorage.getItem('user'));
        //store the data in redux store
        dispatch(loadUserData({
            username: data?.username ?? '',
            emailVerified: data?.emailVerified ?? false,
        }));
    }, []);


    //Services all the snackbar need of the application
    const snackBar = (message, severity, dispatch) => {
        const handleClose = () => {
            dispatch(closeSnackbar());
        }
        return <Snackbar open={snackBarOpen}
            autoHideDuration={6000}
            message={message}
            severity={severity}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleClose}
        />
    }

    //Fetches user's email from server for editing
    const handleEditEmail = (event) => {
        updateState({ openSettingMenu: false })
        editProfile(event, state, updateState, 'email',
            dispatch, remoteRequest, navigate, openSnackbar, toggleBlockView);
    }

    //Closes the circular progress indicator
    const handleBlockViewClose = (event) => {
        dispatch(toggleBlockView({ blockView: false }));
    }

    //Fetches user's username from server for editing
    const handleEditUsername = (event) => {
        updateState({ openSettingMenu: false })
        editProfile(event, state, updateState, 'username',
            dispatch, remoteRequest, navigate, openSnackbar, toggleBlockView);
    }

    //Called when the settings menu is clicked to either open or close it
    const handleMenuClose = (event) => {
        return updateState({ menuAnchor: event.target, openSettingMenu: !state.openSettingMenu });
    }

    //Clalled to log out the user
    const handleLogout = (event) => {
        updateState({ openSettingMenu: false })
        logOut(event, state, updateState, dispatch, openSnackbar,
            navigate, remoteRequest, logOutUser, toggleBlockView)
    }

    const handleBuddies = (event) => { }

    //Fetches the user's username,email, phone number and interests from the server
    const handleProfile = (event) => {
        getProfile(event, state, updateState, dispatch, remoteRequest,
            navigate, openSnackbar, toggleBlockView);
    }

    const handleDiscover = (event) => { }

    //Navigates the user to the update password internal route
    const handleChangePassword = (event) => {
        updateState({ openSettingMenu: false });
        navigate('/update-password');
    }

    //Calls the index page route when the logo of the application is clicked
    const handleLogoClick = (event) => {
        navigate('/', { replace: true });
    }

    //Items required in the settings menu
    const settingMenuContents = userInfo?.username && [
        { label: 'Change Password', icon: (<PasswordIcon />), processor: handleChangePassword },
        { label: 'Update Email', icon: (<EmailIcon />), processor: handleEditEmail },
        { label: 'Update Username', icon: (<EditIcon />), processor: handleEditUsername },
        { label: 'Log out', icon: (<Logout />), processor: handleLogout },
    ]

    return (
        <>
            {/* Header of the application */}
            <AppBar position="sticky"  >
                <Toolbar>
                    <ListItemText onClick={handleLogoClick}>
                        <Typography variant="h5" color='inherit'>
                            Sport Interests App
                        </Typography>
                    </ListItemText>
                    <Box sx={{ flexGrow: 1 }} /> {/* Creates spacing */}

                    {/* Should only be rendered if user is logged in and screen width is bigger than 450px */}
                    {(userInfo?.username) && ((window.innerWidth) > 450)
                        && <Box sx={{ display: 'flex' }} >
                            {/* Profile */}
                            <IconButton color='inherit' size="large"
                                onClick={handleProfile}>
                                <Profile />
                            </IconButton>

                            {/* Buddies */}
                            <IconButton edge='start' color='inherit' size="large"
                                onClick={handleBuddies}>
                                <Buddies />
                            </IconButton>

                            {/* Discover */}
                            <IconButton edge='start' color='inherit' size="large"
                                onClick={handleDiscover}>
                                <Discover />
                            </IconButton>

                            {/* Settings */}
                            <IconButton edge='end' color='inherit' size="large"
                                onClick={handleMenuClose}>
                                <Setting />
                            </IconButton>
                        </Box>
                    }
                </Toolbar>
            </AppBar>

            {/* Snackbar that services the whole application */}
            {openSnackbar && snackBar(message, severity, dispatch)}

            {/* Main content of the applicaion. More like the body of the application 
            Bottom padding of 5 was used because of the bottom navigation bar.*/}
            <Paper sx={{ pb: 5 }}>
                <Outlet />
            </Paper>

            {/* Bottom navigation area */}
            {/* Should only be rendered if user is logged in and screen width is smaller than 450px */}
            {userInfo?.username && ((window.innerWidth) < 450) ?
                <Paper position='fixed' sx={{ bottom: 0, right: 0, left: 0, position: 'fixed' }} elevation={3}>
                    <BottomNavigation showLabels >
                        {/*  Profile */}
                        <BottomNavigationAction label='Profile' icon={<Profile />}
                            onClick={handleProfile} />
                        {/* Buddies */}
                        <BottomNavigationAction label='Buddies' icon={<Buddies />}
                            onClick={handleBuddies} />
                        {/* Discover */}
                        <BottomNavigationAction label='Discover' icon={<Discover />}
                            onClick={handleDiscover} />
                        {/* Settings */}
                        <BottomNavigationAction label='Settings' icon={<Setting />}
                            onClick={handleMenuClose} />
                    </BottomNavigation>
                </Paper> : null
            }

            {/* Settings menu definition */}
            {state.openSettingMenu && <Menu
                onClose={handleMenuClose}
                open={state.openSettingMenu}
                anchorEl={state.menuAnchor}>

                <MenuItem>
                    {'Welcome, ' + userInfo?.username ?? 'Anonymous'}
                </MenuItem>

                {/* Renders each item in the settings menu from the settingMenuContents array*/}
                {settingMenuContents.map(content =>
                    content && <MenuItem onClick={content?.processor}>
                        <ListItemIcon>
                            {content?.icon}
                        </ListItemIcon>
                        {content?.label}
                    </MenuItem>
                )}
            </Menu>}

            {/* Circular Progress Indicator that indicates ongoing 
            process that should not be interrupted */}
            <Modal hideBackdrop open={blockView} onClose={handleBlockViewClose}>
                <CircularProgress sx={{ left: '50%', top: '50%', position: 'absolute' }} />
            </Modal>
        </>
    );
}

export default RootLayout;