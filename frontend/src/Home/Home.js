import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import sampleImg from '../images/icons8-doctor-male-48.png';
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dataUsed } from '../app/frontPageSlice';
import { addToCart } from '../app/cartSlice';
//import { getProfile } from "./homeLogic";

import { reRouteRequest } from '../app/routeSlice';
import { getUser } from "./homeLogic";

function Home(props) {

    const matches = Object.entries(props?.data?.frontPage);


    console.log('home, props?.data?.frontPage: ', props?.data?.frontPage);

    // console.log(Object.entries(matches));

    const loginType = useSelector(state => state.route.loginType);

    const dispatch = useDispatch();

    useEffect(() => { dispatch(dataUsed()) }, []);


    const navigate = useNavigate();

    const [state, setState] = useState({
        // data: location.state ?? { trending: [], latest[]: viewed: []},
        loginType: loginType,

    });

    const updateState = (newValue) => {
        setState((previousValue) => {
            return { ...previousValue, ...newValue };
        });
    };

    const handleClick = (event) => {
        console.log('handleClick ', 'id:', event.currentTarget.id)
        getUser = (event, state, updateState, dispatch,
            navigate, event.target.id)
    }


    return (
        <>
            <Grid container >
                {(matches?.length) ?
                    <Grid container lg={4} xs={12} order={{ lg: 1, xs: 2 }} >
                        {/*  For trending items */}
                        <Container>
                            <Card>
                                <CardContent>

                                    <List>
                                        {matches.map((item, indx) => (

                                            <ListItem id={item[0]} onClick={handleClick}>
                                                <ListItemAvatar>
                                                    <Avatar src={sampleImg} />
                                                </ListItemAvatar>
                                                <ListItemText primary={item[0]}
                                                    secondary={item[1]?.interests?.toString()}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>


                                </CardContent>
                            </Card>
                        </Container>
                    </Grid>
                    :
                    <Card>
                        <CardContent>
                            You currently have no match
                        </CardContent>
                    </Card>
                }
            </Grid>

        </>
    );
}

export default Home;