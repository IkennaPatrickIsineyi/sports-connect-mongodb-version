import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import { Container } from "@mui/system";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import { remoteRequest } from "../app/model";
import { getHomePage } from "./indexPageLogic";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { dataUsed } from '../app/frontPageSlice';
import { loadUserData } from '../app/userDataSlice';
import { openSnackbar, toggleBlockView } from '../app/routeSlice';

function IndexPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.userData);
    const isLoggingIn = useSelector((state) => state.route.isLoggingIn);


    const [state, setState] = useState({
        data: location.state, checking: false, dataUsed: dataUsed,
        networkIssue: false,
        complete: false
    });

    const updateState = (newValue) => {
        setState((previousValue) => {
            return { ...previousValue, ...newValue };
        });
    }

    const data = state.data;

    console.log('data?.frontPage', data, 'userData', userData, 'location state', location.state);

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
                    {(!state.checking) ? getHomePage(state, updateState,
                        remoteRequest, dispatch, loadUserData, openSnackbar,
                        navigate, toggleBlockView) : null}
                </Box>
            }
        </>
    )
}

export default IndexPage;