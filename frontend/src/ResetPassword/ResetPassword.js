import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { remoteRequest } from "../app/model";
import { openSnackbar, toggleBlockView } from "../app/routeSlice";
import { submitPassword } from "./resetPasswordLogic";

function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        password1: { value: '', errMsg: '' }, password2: { value: '', errMsg: '' },
    });

    const updateState = (newValue) => {
        setState((previousValue) => { return { ...previousValue, ...newValue } });
    }


    const validatePassword = (event) => {
        if (!event.currentTarget.value) {
            updateState({ [event.currentTarget.id]: { ...state[event.currentTarget.id], errMsg: 'Required' } })
        }
        else if (event.currentTarget.id === 'password2' && state.password1.value) {
            if (state.password1.value !== state.password2.value) {
                updateState({ [event.currentTarget.id]: { ...state[event.currentTarget.id], errMsg: 'Password does not match' } })
            }
        }
    }


    return (
        <Box display='flex' justifyContent='center' alignItems='center'>
            <Card>
                <CardContent>
                    <Grid container rowSpacing={2}>
                        <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                            Choose a new password
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth variant="outlined" label='New password' type={'password'}
                                id='password1' onBlur={validatePassword} error={state.password1.errMsg}
                                onChange={(event) => { updateState({ password1: event.target.value }) }}
                                helperText={state.password1.errMsg}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth variant="outlined" label='Confirm new password' type={'password'}
                                id='password2' onBlur={validatePassword} error={state.password2.errMsg}
                                onChange={(event) => { updateState({ password2: event.target.value }) }}
                                helperText={state.password2.errMsg} />
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                            <Button variant="contained"
                                onClick={(event) => {
                                    submitPassword(event, state,
                                        updateState, navigate, dispatch,
                                        openSnackbar, remoteRequest, toggleBlockView)
                                }}>
                                Reset Password
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ResetPassword;