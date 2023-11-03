import React, { useEffect } from 'react';
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
import OrderListComponent from './UserOrderListComponent';

interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    admin: boolean;
    firstName: string;
    lastName: string;
    phone: number;
    Gender: boolean;
    address: string | null;
    // dateOfBirth: Date;
    role: string;
    __v: number;
}

export default function UserProfileComponent() {
    const token = localStorage.getItem("token"); // Don't parse it yet
    // const parseToken = token ? JSON.parse(token) : '';
    const decodeObj = localStorage.getItem("decode"); // Don't parse it yet
    const decodedValue = decodeObj ? JSON.parse(decodeObj) : '';
    const [user, setUser] = React.useState<User>();

    useEffect(() => {
        console.log("http://localhost:5000/v1/user/" + `${decodedValue.id}`);
        console.log("Bearer ", `${localStorage.getItem("token")}`);
        fetch("http://localhost:5000/v1/user/" + `${decodedValue.id}`, {
            method: "GET",
            headers: {
                "token": `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": '*',
                "Accept": "/",
                "X-Requested-With": "XMLHttpRequest",
                "Cache-Control": "no-cache"
            }
        }).then((responseStatus) => {
            console.log(responseStatus);
            if (responseStatus.status === 200) {
                responseStatus.json()
            } else { }
        }).then((res: any) => {
            setUser(res);
            console.log(res);
        })
            .catch(() => { });
    }, []);

    return (
        <div>
            <HeaderComponent></HeaderComponent>
            <Container sx={{ marginTop: '200px' }} className="py-5">
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
                    {user && (
                        <Grid item lg={8}>
                            <Card className="mb-4">
                                <CardContent>
                                    <Grid container>
                                        <Grid item sm={3}>
                                            <Typography variant="subtitle1">Full Name</Typography>
                                        </Grid>
                                        <Grid item sm={9}>
                                            <Typography variant="subtitle2" className="text-muted">
                                                {user.firstName + " " + user.lastName}
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
                                                {user.email}
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
                                                {user.phone}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <hr />
                                    <Grid container>
                                        <Grid item sm={3}>
                                            <Typography variant="subtitle1">Birthdate</Typography>
                                        </Grid>
                                        <Grid item sm={9}>
                                            <Typography variant="subtitle2" className="text-muted">
                                                {user.role}
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
                                                {user.address}
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
                    )}
                </Grid>
                <OrderListComponent userId={decodedValue.id}></OrderListComponent>
            </Container>
            <FooterComponent></FooterComponent>
        </div>
    );
}
