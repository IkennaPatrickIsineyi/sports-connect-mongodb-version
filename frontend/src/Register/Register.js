import { Autocomplete, Box, Button, Card, CardContent, Divider, FormControl, FormControlLabel, Grid, IconButton, InputLabel, List, ListItem, ListItemIcon, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { Container } from "@mui/material";
import Submit from '@mui/icons-material/Send'
import { useState } from "react";
import { signUp, validateInput } from "./registerLogic";
import { remoteRequest } from "../app/model";
import Delete from "@mui/icons-material/Cancel";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loadUserData } from '../app/userDataSlice';

import { openSnackbar } from '../app/routeSlice';
import { sports } from "./sports";

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [states, setState] = useState({
        email: { value: location.state?.email ?? '', errMsg: '' },
        password1: { value: location.state?.password ?? '', errMsg: '' },
        password2: { value: location.state?.password ?? '', errMsg: '' },
        username: { value: location.state?.username ?? '', errMsg: '' },
        phone: { value: location.state?.phone ?? '', errMsg: '' }, sports: sports,
        interests: { value: location.state?.interests ?? [], errMsg: '' },
        clear: false
    });

    const updateState = (newValue) => {
        setState((previousValue) => { return { ...previousValue, ...newValue } })
    }

    const handleInterest = (event) => {
        updateState({ interests: { errMsg: '', value: [...new Set([...states.interests.value, event.target.value])] } })
    }

    const handleUsername = (event) => {
        updateState({ username: { errMsg: '', value: event.target.value } })
    }

    const handleEmail = (event) => {
        updateState({ email: { errMsg: '', value: event.target.value } })
    }

    const handlePhone = (event) => {
        updateState({ phone: { errMsg: '', value: event.target.value } })
    }

    const removeInterest = (event) => {
        const value = states.interests.value;
        value.splice(event.currentTarget.id, 1);
        updateState({ interests: { ...states.interests, value: [...new Set(value)] } })
    }

    const handlePassword1 = (event) => {
        updateState({ password1: { errMsg: '', value: event.target.value } })
    }

    const handlePassword2 = (event) => {
        updateState({ password2: { errMsg: '', value: event.target.value } })
    }

    const handleSubmit = (event) => {
        signUp(event, states, dispatch, openSnackbar, navigate);
    }

    const validate = (event) => {
        if (!event.currentTarget.value)
            updateState({ [event.currentTarget.id]: { ...states[event.currentTarget.id], errMsg: 'Required' } })
        else validateInput(states, updateState, remoteRequest, dispatch,
            openSnackbar, event.currentTarget.id, event.currentTarget.value)
    }

    const validateInterest = (event) => {
        if (!states.interests.value.length) {
            updateState({ [event.currentTarget.id]: { ...states[event.currentTarget.id], errMsg: 'Required' } })
        }
    }

    const validatePassword = (event) => {
        if (!event.currentTarget.value) {
            updateState({ [event.currentTarget.id]: { ...states[event.currentTarget.id], errMsg: 'Required' } })
        }
        else if (event.currentTarget.id === 'password2' && states.password1.value) {
            if (states.password1.value !== states.password2.value) {
                updateState({ [event.currentTarget.id]: { ...states[event.currentTarget.id], errMsg: 'Password does not match' } })
            }
        }
    }

    return (
        <Box display={'flex'} justifyContent='center' alignItems={'center'}>
            <Card>
                <CardContent>
                    <Grid container rowSpacing={2}>
                        <Grid item xs={12} display={'flex'} justifyContent='center' alignItems={'center'}>
                            <Typography variant="h6">
                                Sign up form
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth variant="outlined" id='username' label='Username' type={'text'}
                                onChange={handleUsername} onBlur={validate} helperText={states.username.errMsg}
                                error={states.username.errMsg} value={states.username.value}
                            />
                        </Grid>
                        <Grid item xs={12}>

                            <TextField fullWidth variant="outlined" id='email' label='Email' type={'email'}
                                onChange={handleEmail} onBlur={validate} helperText={states.email.errMsg}
                                error={states.email.errMsg} value={states.email.value}
                            />
                        </Grid>
                        <Grid item xs={12}>

                            <TextField fullWidth variant="outlined" id='phone' label='Phone number' type={'phone'}
                                onChange={handlePhone} onBlur={validate} helperText={states.phone.errMsg}
                                error={states.phone.errMsg} value={states.phone.value}
                            />
                        </Grid>

                        <FormControl fullWidth>
                            <InputLabel id='sport-id'>Select Sports Interests</InputLabel>
                            <Select labelId="sport-id" fullWidth id='interests'
                                variant='filled'
                                onChange={handleInterest} helperText={states.interests.errMsg}
                                error={states.interests.errMsg} onBlur={validateInterest}>

                                {states.sports.map(sport =>
                                    <MenuItem value={sport}>
                                        {sport}
                                    </MenuItem>
                                )}

                            </Select>
                        </FormControl>
                        {(states.interests.value.length) ? <Grid item xs={12}>
                            <List>
                                {states.interests.value.map((interest, index) =>
                                    <ListItem >
                                        {interest}
                                        <ListItemIcon edge='end' onClick={removeInterest} id={index}>
                                            <Delete />
                                        </ListItemIcon>
                                    </ListItem>
                                )}

                            </List>
                        </Grid> : null}

                        <Grid item xs={12}>
                            <TextField fullWidth variant="outlined" id='password1' label='Password' type={'password'}
                                onChange={handlePassword1} helperText={states.password1.errMsg}
                                error={states.password1.errMsg} onBlur={validatePassword} value={states.password1.value}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth variant="outlined" id='password2' label='Confirm password' type={'password'}
                                onChange={handlePassword2} helperText={states.password2.errMsg}
                                error={states.password2.errMsg} onBlur={validatePassword} value={states.password2.value}
                            />
                        </Grid>
                        <Grid item xs={12} display={'flex'} justifyContent='center' alignItems={'center'}>
                            <Button variant="contained" type="submit" startIcon={<Submit />}
                                onClick={handleSubmit}>
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Register;