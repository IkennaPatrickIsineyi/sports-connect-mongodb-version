import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { remoteRequest } from "../app/model";
import { openSnackbar, toggleBlockView } from "../app/routeSlice";
import { sendOtp } from "./sendOtpCodeLogic";

function SendOtpCode() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [states, setState] = useState({
        email: ''
    });

    const updateState = (newValue) => {
        setState((previousValue) => { return { ...previousValue, ...newValue } });
    }

    return (
        <Box display='flex' justifyContent='center' alignItems='center'>
            <Card>
                <CardContent>
                    <Grid container rowSpacing={2}>
                        <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                            What is your email address?
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth variant="outlined" label='email' type={'email'}
                                onChange={(event) => { updateState({ email: event.target.value }) }}
                            />
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                            <Button variant="contained"
                                onClick={(event) => {
                                    sendOtp(event, states, updateState,
                                        navigate, dispatch, openSnackbar, remoteRequest, toggleBlockView)
                                }}>
                                Receive OTP Code
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}

export default SendOtpCode;