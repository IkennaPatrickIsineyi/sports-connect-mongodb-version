import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import { remoteRequest } from "../app/model";
import { getHomePage } from "./indexPageLogic";
import { useDispatch } from 'react-redux';
import { loadUserData } from '../app/userDataSlice';
import { openSnackbar, toggleBlockView } from '../app/routeSlice';

function IndexPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();


    const [state, setState] = useState({
        data: location.state, checking: false,
        networkIssue: false,
        complete: false
    });

    const updateState = (newValue) => {
        setState((previousValue) => {
            return { ...previousValue, ...newValue };
        });
    }

    const data = state.data;

    //if frontpage data exists, load home page, else, query the server for the frontpage data
    return (
        <>
            {(data)
                ?
                <Home data={data} />
                :
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Container>
                        <Card>
                            <CardContent>
                                {
                                    (state.networkIssue) ?
                                        'Network Error: Check your Internet connection'
                                        :
                                        <Container>
                                            <CircularProgress />
                                            Loading...
                                        </Container>
                                }
                            </CardContent>
                        </Card>
                    </Container>
                    {/* Checking was used to prevent multiple requests being sent */}
                    {(!state.checking) ? getHomePage(state, updateState,
                        remoteRequest, dispatch, loadUserData, openSnackbar,
                        navigate, toggleBlockView) : null}
                </Box>
            }
        </>
    )
}

export default IndexPage;