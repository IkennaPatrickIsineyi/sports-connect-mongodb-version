import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Container, CssBaseline, Divider, Grid, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { useState } from "react";
import sampleImg from '../images/icons8-doctor-male-48.png';
import { useLocation } from "react-router-dom";

function UserDetails() {
    const location = useLocation();
    console.log('location: ', location.state);
    const [state, setState] = useState({
        profile: { ...location.state?.profileData },
        interest: [...location.state?.interests]
    });

    return (
        <Box sx={{ left: 0, right: 0 }} >

            <Paper >
                <CardHeader title="Profile" />
                {/* profile picture */}
                <Container >
                    <Avatar src={state.profile.profile_picture ?? sampleImg}
                        sx={{ height: 150, width: 150 }} />
                </Container>

                <List >
                    <Card>
                        <ListItem>
                            <ListItemText primary={'Username'} secondary={state.profile.username} />
                        </ListItem>
                    </Card>

                    <Card>
                        <ListItem>
                            <ListItemText primary={'Email'} secondary={state.profile.email} />
                        </ListItem>
                    </Card>
                    <Card>
                        <ListItem>
                            <ListItemText primary={'Phone'} secondary={state.profile.phone} />
                        </ListItem>
                    </Card>
                    <Card>
                        <ListItem>
                            <ListItemText primary={'Interests'} secondary=
                                {state.interest.map((interestObj, rowIndex) => (
                                    <ListItemText primary={interestObj.interest} />

                                ))} />
                        </ListItem>
                    </Card>

                </List>


            </Paper>
        </Box>
    );
}

export default UserDetails;