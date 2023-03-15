import {
    Avatar, Card, CardContent, Container, Grid, List, ListItem,
    ListItemAvatar, ListItemText
} from "@mui/material";
import sampleImg from '../images/icons8-doctor-male-48.png';


function Home(props) {

    const matches = Object.entries(props?.data?.frontPage);

    return (
        <>
            <Grid container >
                {(matches?.length) ?
                    <Grid container lg={4} xs={12} order={{ lg: 1, xs: 2 }} >
                        {/*  For users with same interests as this users */}
                        <Container>
                            <Card>
                                <CardContent>
                                    <List>
                                        {matches.map((item, indx) => (
                                            <ListItem id={item[0]}  >
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