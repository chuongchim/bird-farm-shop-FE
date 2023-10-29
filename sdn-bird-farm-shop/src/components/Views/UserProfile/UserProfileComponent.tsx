import React from 'react';
import {
    Container,
    Typography,
    Breadcrumbs,
    Link,
    Card,
    CardContent,
    CardMedia,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    LinearProgress,
    Paper,
    Grid,
} from '@mui/material';
import {
    Facebook,
    Twitter,
    Instagram,
    GitHub,

    Person,
    Email,
    Phone,
    Room,
    Assignment,
} from '@mui/icons-material';
import HeaderComponent from '../../Common/Header/HeaderComponent';
import FooterComponent from '../../Common/Footer/FooterComponent';

export default function UserProfileComponent() {
    return (
        <div>
            <HeaderComponent></HeaderComponent>
            <Container sx={{marginTop: '200px'}} className="py-5">
                <Grid >
                    <Grid item>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" href="#">
                                Home
                            </Link>
                            <Link color="inherit" href="#">
                                User
                            </Link>
                            <Typography color="textPrimary">User Profile</Typography>
                        </Breadcrumbs>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item lg={4}>
                        <Card className="mb-4">
                            <CardContent className="text-center">
                                <CardMedia
                                    component="img"
                                    alt="avatar"
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    title="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                />
                                <Typography variant="subtitle1" className="text-muted mb-1">
                                </Typography>
                                <Typography variant="subtitle2" className="text-muted mb-4">
                                    hihihihi
                                </Typography>
                                <div className="d-flex justify-content-center mb-2">

                                </div>
                            </CardContent>
                        </Card>

                        <Card className="mb-4 mb-lg-0">
                            <CardContent className="p-0">
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            {/* <Globe color="warning" /> */}
                                        </ListItemIcon>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <GitHub style={{ color: '#333333' }} />
                                        </ListItemIcon>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Twitter style={{ color: '#55acee' }} />
                                        </ListItemIcon>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Instagram style={{ color: '#ac2bac' }} />
                                        </ListItemIcon>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Facebook style={{ color: '#3b5998' }} />
                                        </ListItemIcon>
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={8}>
                        <Card className="mb-4">
                            <CardContent>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <Typography variant="subtitle1">Full Name</Typography>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <Typography variant="subtitle2" className="text-muted">
                                            dsfsdf
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item sm={3}>
                                        <Typography variant="subtitle1">Email</Typography>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <Typography variant="subtitle2" className="text-muted">
                                            sdfsdf@gsd.com
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item sm={3}>
                                        <Typography variant="subtitle1">Phone</Typography>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <Typography variant="subtitle2" className="text-muted">
                                            (097) 234-5678
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item sm={3}>
                                        <Typography variant="subtitle1">Mobile</Typography>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <Typography variant="subtitle2" className="text-muted">
                                            (098) 765-4321
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <hr />
                                <Grid container>
                                    <Grid item sm={3}>
                                        <Typography variant="subtitle1">Address</Typography>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <Typography variant="subtitle2" className="text-muted">
                                           hihi
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        <Grid container>
                            <Grid item md={6}>
                                <Card className="mb-4 mb-md-0">
                                    <CardContent>
                                        <Typography variant="subtitle2" className="mb-4">
                                            <span className="text-primary font-italic me-1">assigment</span> Project Status
                                        </Typography>
                                        <Typography variant="subtitle2" style={{ fontSize: '.77rem' }}>
                                            Web Design
                                        </Typography>
                                        <LinearProgress variant="determinate" value={80} />
                                        <Typography variant="subtitle2" className="mt-4" style={{ fontSize: '.77rem' }}>
                                            Website Markup
                                        </Typography>
                                        <LinearProgress variant="determinate" value={72} />
                                        <Typography variant="subtitle2" className="mt-4" style={{ fontSize: '.77rem' }}>
                                            One Page
                                        </Typography>
                                        <LinearProgress variant="determinate" value={89} />
                                        <Typography variant="subtitle2" className="mt-4" style={{ fontSize: '.77rem' }}>
                                            Mobile Template
                                        </Typography>
                                        <LinearProgress variant="determinate" value={55} />
                                        <Typography variant="subtitle2" className="mt-4" style={{ fontSize: '.77rem' }}>
                                            Backend API
                                        </Typography>
                                        <LinearProgress variant="determinate" value={66} />
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item md={6}>
                                <Card className="mb-4 mb-md-0">
                                    <CardContent>
                                        <Typography variant="subtitle2" className="mb-4">
                                            <span className="text-primary font-italic me-1">assigment</span> Project Status
                                        </Typography>
                                        <Typography variant="subtitle2" style={{ fontSize: '.77rem' }}>
                                            Web Design
                                        </Typography>
                                        <LinearProgress variant="determinate" value={80} />
                                        <Typography variant="subtitle2" className="mt-4" style={{ fontSize: '.77rem' }}>
                                            Website Markup
                                        </Typography>
                                        <LinearProgress variant="determinate" value={72} />
                                        <Typography variant="subtitle2" className="mt-4" style={{ fontSize: '.77rem' }}>
                                            One Page
                                        </Typography>
                                        <LinearProgress variant="determinate" value={89} />
                                        <Typography variant="subtitle2" className="mt-4" style={{ fontSize: '.77rem' }}>
                                            Mobile Template
                                        </Typography>
                                        <LinearProgress variant="determinate" value={55} />
                                        <Typography variant="subtitle2" className="mt-4" style={{ fontSize: '.77rem' }}>
                                            Backend API
                                        </Typography>
                                        <LinearProgress variant="determinate" value={66} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <FooterComponent></FooterComponent>
        </div>
    );
}
