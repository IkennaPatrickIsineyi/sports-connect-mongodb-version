import { Box, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import SignIn from '@mui/icons-material/Login';
import CreateAcct from '@mui/icons-material/Create';
import { signIn, gotoSignUpPage, gotoResetPasswordPage } from './loginLogic';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { remoteRequest } from '../app/model';
import { useDispatch } from 'react-redux';
import { loadUserData } from '../app/userDataSlice';
import { openSnackbar, toggleBlockView } from '../app/routeSlice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const nextRoute = useSelector(state => state.route.nextRoute);


    const [state, setState] = useState({
        userId: '', password: ''
    });

    const updateState = (newValue) => {
        return setState((previousValue) => { return { ...previousValue, ...newValue } });
    };

    return (
        <>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Card >
                    <CardContent>
                        <Grid container rowSpacing={2}    >
                            <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                                <Typography variant='h5'>
                                    Sign in to continue
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth variant="outlined" label="Email/Phone" type={'text'}
                                    onChange={(event) => { return updateState({ userId: event.target.value }) }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth variant="outlined" label="Password" type={'password'}
                                    onChange={(event) => { return updateState({ password: event.target.value }) }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} display='flex' justifyContent='center' alignItems='center'>
                                <Button variant="contained" startIcon={<SignIn />} size='large'
                                    onClick={(event) => {
                                        signIn(event, state, updateState,
                                            dispatch, loadUserData, remoteRequest,
                                            navigate, openSnackbar, toggleBlockView)
                                    }}>
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} display='flex' justifyContent='center' alignItems='center'>
                                <Button variant="contained" startIcon={<CreateAcct />} size='large'
                                    onClick={(event) => { gotoSignUpPage(event, state, navigate) }}>
                                    Sign up
                                </Button>
                            </Grid>
                            <Grid item xs={12} display='flex' justifyContent='center' alignItems='center' >
                                <Button variant="text" onClick={(event) => { gotoResetPasswordPage(event, state, navigate) }}>
                                    Forgot password?
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}

export default Login;