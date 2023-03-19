import {
    Avatar, Card, CardContent, Container, Grid, List, ListItem,
    ListItemAvatar, ListItemText, Typography
} from "@mui/material";
import sampleImg from '../images/icons8-doctor-male-48.png';

function Home(props) {

    const matches = Object.entries(props?.data?.frontPage);

    return (
        <Grid container >
            {(matches?.length) ?
                <Grid container lg={4} xs={12} order={{ lg: 1, xs: 2 }} >
                    {/*  For users with same interests as this users */}
                    <Container>
                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            {matches.map((item, indx) => (<Card elevation={5} sx={{ mb: 1 }}>
                                <ListItem id={item[0]} alignItems='flex-start' >
                                    <ListItemAvatar>
                                        <Avatar src={sampleImg} />
                                    </ListItemAvatar>
                                    <ListItemText primary={<b>{item[0]}</b>}
                                        secondary={
                                            <Typography sx={{ display: 'inline', }}
                                                variant='body2'
                                                component='span'
                                            >
                                                {item[1]?.interests?.toString()}
                                            </Typography>
                                        }
                                    />
                                </ListItem> </Card>
                            ))}
                        </List>



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
    );
}

export default Home;