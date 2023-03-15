import { Button, Card, CardContent, Container, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editProfile, validateInput } from "./editProfileLogic";
import { useDispatch } from "react-redux";
import { reRouteRequest, openSnackbar, toggleBlockView } from "../app/routeSlice";
import { remoteRequest } from "../app/model";
const { logOutUser } = require("../app/userDataSlice");


function EditProfile() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState({
        username: { value: location.state?.username ?? '', errMsg: '' },
        email: { value: location.state?.email ?? '', errMsg: '' },
        inputUsername: { value: '', errMsg: '' },
        inputEmail: { value: '', errMsg: '' },
    });

    const updateState = (newValue) => {
        setState((previousValue) => {
            return { ...previousValue, ...newValue }
        })
    }
    const handleUsername = (event) => {
        updateState({ inputUsername: { errMsg: '', value: event.target.value } });
    }

    const handleEmail = (event) => {
        updateState({ inputEmail: { errMsg: '', value: event.target.value } });
    }


    const handleClick = (event) => {
        if (state.email.value) {
            if (!state.inputEmail.value)
                updateState({ inputEmail: { ...state.inputEmail, errMsg: 'Required' } })
            else {
                validateInput(state, updateState, remoteRequest, dispatch,
                    openSnackbar, 'email', state.inputEmail.value, 'inputEmail', () => {
                        editProfile(event, state, updateState, dispatch, 'email',
                            reRouteRequest, remoteRequest, openSnackbar, navigate,
                            logOutUser, toggleBlockView)
                    })

            }
        }
        else {
            if (!state.inputUsername.value)
                updateState({ inputUsername: { ...state.inputUsername, errMsg: 'Required' } })
            else {
                validateInput(state, updateState, remoteRequest, dispatch,
                    openSnackbar, 'username', state.inputUsername.value, 'inputUsername', () => {
                        editProfile(event, state, updateState, dispatch, 'username',
                            reRouteRequest, remoteRequest, openSnackbar, navigate, logOutUser, toggleBlockView)
                    });
            }
        }

    }

    const title = `Edit ${(state.username.value) ? 'Username' : 'Email'} `;


    return (
        <Box display='flex' justifyContent={'center'} alignItems='center'>
            <Card>
                <CardContent>
                    <Typography align='center' sx={{ typography: { xs: 'h6', md: 'h4' } }}>
                        {title}
                    </Typography>
                    <Divider />
                    <FormControl>
                        <Grid container rowSpacing={2} sx={{ 'pt': 2 }} display='flex' justifyContent={'center'} alignItems='center'>
                            {(state.username.value) ?
                                <TextField fullWidth variant="outlined" id='username' label='Username' type={'text'}
                                    onChange={handleUsername} helperText={state.inputUsername.errMsg}
                                    error={state.inputUsername.errMsg} defaultValue={state.inputUsername.value}
                                /> :
                                <Grid item xs={12}>
                                    <TextField fullWidth variant="outlined" id='email' label='Email' type={'email'}
                                        onChange={handleEmail} helperText={state.inputEmail.errMsg}
                                        error={state.inputEmail.errMsg} defaultValue={state.inputEmail.value}
                                    />
                                </Grid>
                            }
                            <Grid item xs={12} sx={{ 'pt': 2 }} display='flex' justifyContent={'center'} alignItems='center'>
                                <Button variant='contained' type={'submit'}
                                    onClick={handleClick}>
                                    Save Changes
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>

                </CardContent>
            </Card>
        </Box>
    );
}

export default EditProfile;