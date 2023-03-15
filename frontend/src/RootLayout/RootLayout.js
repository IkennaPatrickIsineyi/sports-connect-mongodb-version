import { Outlet, useLocation, useNavigate } from "react-router-dom";
//import AppBar from '@mui/material/AppBar';
import { AppBar, Box, IconButton, Toolbar, Typography, Menu, MenuItem, ListItemIcon, Snackbar, ListItemText, BottomNavigation, BottomNavigationAction, Paper, CssBaseline, List, Modal, CircularProgress } from "@mui/material";
//import MenuIcon from "@mui/icons-material/Menu";
import LogOut from "@mui/icons-material/Logout";
import Profile from "@mui/icons-material/AccountCircleRounded";
import LogIn from "@mui/icons-material/Login";
import Buddies from "@mui/icons-material/People";
import Discover from "@mui/icons-material/Search";
import Setting from "@mui/icons-material/Settings";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";

import EditIcon from "@mui/icons-material/EditAttributesRounded";
import { logOutUser, loadUserData } from '../app/userDataSlice';
import { closeSnackbar, loginComplete, reRouteRequest, toggleBlockView } from '../app/routeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addNewStock, editProfile, getProfile, logOut } from "./rootLayoutLogic";
import { useMemo, useState } from "react";
import { remoteRequest } from "../app/model";
import Login from "../Login/Login";
import Logout from "@mui/icons-material/Logout";
import { Container } from "@mui/system";
import { openSnackbar } from '../app/routeSlice';

function RootLayout() {
    const userInfo = useSelector(state => state.userData);
    const isLoggingIn = useSelector(state => state.route.isLoggingIn);
    const snackBarOpen = useSelector(state => state.route.showSnackbar);
    const message = useSelector(state => state.route.snackbarMessage);
    const severity = useSelector(state => state.route.snackbarSeverity);
    const blockView = useSelector(state => state.route.blockView)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

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
        const data = JSON.parse(localStorage.getItem('user'));
        dispatch(loadUserData({
            username: data?.username ?? '',
            emailVerified: data?.emailVerified ?? false,
        }));
    }, []);


    const snackBar = (message, severity, dispatch) => {
        const handleClose = () => {
            dispatch(closeSnackbar());
        }
        return <Snackbar open={snackBarOpen}
            autoHideDuration={6000}
            message={message}
            severity={severity}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleClose} />
    }

    const handleEditEmail = (event) => {
        updateState({ openSettingMenu: false })
        editProfile(event, state, updateState, 'email',
            dispatch, reRouteRequest, remoteRequest, navigate, openSnackbar, toggleBlockView);
    }

    const handleBlockViewClose = (event) => {
        dispatch(toggleBlockView());
    }

    const handleEditUsername = (event) => {
        updateState({ openSettingMenu: false })
        editProfile(event, state, updateState, 'username',
            dispatch, reRouteRequest, remoteRequest, navigate, openSnackbar, toggleBlockView);
    }



    const handleMenuClose = (event) => {
        return updateState({ menuAnchor: event.target, openSettingMenu: !state.openSettingMenu });
    }

    const handleLogout = (event) => {
        updateState({ openSettingMenu: false })
        logOut(event, state, updateState, dispatch, openSnackbar,
            navigate, remoteRequest, logOutUser, toggleBlockView)
    }

    const handleBuddies = (event) => {

    }

    const handleProfile = (event) => {

        getProfile(event, state, updateState, dispatch, remoteRequest,
            navigate, openSnackbar, toggleBlockView);
    }

    const handleDiscover = (event) => {

    }

    const handleSetting = (event) => {
        updateState({ openSettingMenu: !state.openSettingMenu })
    }

    const handleChangePassword = (event) => {
        updateState({ openSettingMenu: false });
        navigate('/update-password');
    }

    const handleLogoClick = (event) => {
        navigate('/', { replace: true });
    }

    const settingMenuContents = userInfo?.username && [
        { label: 'Change Password', icon: (<PasswordIcon />), processor: handleChangePassword },
        { label: 'Update Email', icon: (<EmailIcon />), processor: handleEditEmail },
        { label: 'Update Username', icon: (<EditIcon />), processor: handleEditUsername },
        { label: 'Log out', icon: (<Logout />), processor: handleLogout },
    ]

    return (
        <   >
            <AppBar position="sticky"  >
                <Toolbar>
                    <ListItemText onClick={handleLogoClick}>
                        <Typography variant="h5" color='inherit'>
                            Sport Interests App
                        </Typography>
                    </ListItemText>
                    <Box sx={{ flexGrow: 1 }} />

                    {(userInfo?.username) && ((window.innerWidth) > 450)
                        && <Box sx={{ display: 'flex' }} >
                            <IconButton color='inherit' size="large"
                                onClick={handleProfile}>
                                <Profile />
                            </IconButton>

                            <IconButton edge='start' color='inherit' size="large"
                                onClick={handleBuddies}>
                                <Buddies />
                            </IconButton>

                            <IconButton edge='start' color='inherit' size="large"
                                onClick={handleDiscover}>
                                <Discover />
                            </IconButton>

                            <IconButton edge='end' color='inherit' size="large"
                                onClick={handleMenuClose}>
                                <Setting />
                            </IconButton>
                        </Box>
                    }
                </Toolbar>
            </AppBar>

            {openSnackbar && snackBar(message, severity, dispatch)}

            <Outlet />

            {userInfo?.username && ((window.innerWidth) < 450) ?

                <Paper position='fixed' sx={{ bottom: 0, right: 0, left: 0 }} elevation={3}>
                    <BottomNavigation showLabels >
                        {/*  Bottom navigation bar */}
                        <BottomNavigationAction label='Profile' icon={<Profile />}
                            onClick={handleProfile} />
                        <BottomNavigationAction label='Buddies' icon={<Buddies />}
                            onClick={handleBuddies} />
                        <BottomNavigationAction label='Discover' icon={<Discover />}
                            onClick={handleDiscover} />
                        <BottomNavigationAction label='Settings' icon={<Setting />}
                            onClick={handleMenuClose} />
                    </BottomNavigation>
                </Paper> : null
            }

            {state.openSettingMenu && <Menu
                onClose={handleMenuClose}
                open={state.openSettingMenu}

                anchorEl={state.menuAnchor}>
                <MenuItem>
                    {'Welcome, ' + userInfo?.username ?? 'Anonymous'}
                </MenuItem>
                {settingMenuContents.map(content =>
                    content && <MenuItem onClick={content?.processor}>
                        <ListItemIcon>
                            {content?.icon}
                        </ListItemIcon>
                        {content?.label}
                    </MenuItem>
                )}
            </Menu>}

            <Modal open={blockView} onClose={handleBlockViewClose}>
                <CircularProgress />
            </Modal>
        </>
    );
}

export default RootLayout;