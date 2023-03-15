import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { remoteRequest } from "../app/model";
import { openSnackbar, toggleBlockView } from "../app/routeSlice";
import { sendOtp, verifyOtp } from "./ReceiveOtpLogic";

function ReceiveOtp() {
    const navigate = useNavigate();
    const location = useLocation()
    const dispatch = useDispatch();

    const [state, setState] = useState({
        data: location.state,
        otpSent: false
    });

    const updateState = (newValue) => {
        setState((previousValue) => { return { ...previousValue, ...newValue } });
    }

    return (
        <Box display='flex' justifyContent='center' alignItems='center'>
            <Card>
                {(!state.otpSent) ?
                    <CardContent>
                        <Grid container rowSpacing={2}>
                            <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                                To complete your registration, an OTP is required via SMS or phone call.
                                Click the button below to receive the OTP
                            </Grid>

                            <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                                <Button variant="contained"
                                    onClick={(event) => {
                                        sendOtp(event, state, updateState, navigate, dispatch,
                                            openSnackbar, remoteRequest, toggleBlockView)
                                    }}>
                                    Receive OTP
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                    :
                    <CardContent>
                        <Grid container rowSpacing={2}>
                            <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                                Enter and submit the OTP code that we just sent to your Phone number via SMS
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth variant="outlined" label='OTP Code' type={'number'}
                                    onChange={(event) => { updateState({ otp: event.target.value }) }}
                                />
                            </Grid>
                            <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                                <Button variant="contained"
                                    onClick={(event) => {
                                        verifyOtp(event, state, navigate, dispatch,
                                            openSnackbar, remoteRequest, updateState, toggleBlockView)
                                    }}>
                                    Submit OTP Code
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                }
            </Card>
        </Box>
    );
}

export default ReceiveOtp;