import * as React from 'react';
import './Menu.css';
import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

const drawerWidth = 240;

const openedMixin = (theme: any) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: any) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: any) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100 % - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }: any) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MenuAdmin() {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" className='navigation_bar'>
                <Toolbar style={{ backgroundColor: 'white', color: 'white', position: "fixed", width: "100%" }}>
                    <h6>TTTM.STUDIOS</h6>
                    <IconButton
                        className='button_hover'
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => { setOpen(!open) }}
                        edge="start"
                        style={{ backgroundColor: "#F8F0E5", color: "#DCB07C", borderRadius: "20%", padding: "3px 3px 3px 3px", marginLeft: "5rem" }}
                    >
                        <MenuIcon className='icon_menu' />
                    </IconButton>
                    <TextField
                        variant="outlined"
                        placeholder='Search'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <h2>&#xec38;</h2>
                                </InputAdornment>
                            )
                        }}
                        style={{ width: "25rem", marginLeft: "1%" }}
                    />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader style={{ position: "relative", borderRight: "hidden" }}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {/* LIST MENU CHOICE */}
                {
                    open ? <span style={{ marginLeft: "1rem", fontWeight: "bolder", marginBottom: "1rem", marginTop: "1rem" }}>Dashboard</span> : <span></span>
                }
                <NavLink to="/admin-dashboard" style={{ textDecoration: "none", color: "black", width: "80%", marginLeft: "1rem" }}>
                    <List>
                        <ListItem disablePadding sx={{ display: 'block' }} className='list_menu_choice'>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                className='menuicon'
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <MailIcon className='dashboardicon' />
                                </ListItemIcon>
                                <ListItemText primary="DashBoard" sx={{ opacity: open ? 1 : 0 }} children />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </NavLink>
                <NavLink to="/admin-manage-typeofbird" style={{ textDecoration: "none", color: "black", width: "80%", marginLeft: "1rem", marginTop: "-10px" }}>
                    <List>
                        <ListItem disablePadding sx={{ display: 'block' }} className='list_menu_choice'>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                className='menuicon'
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <MailIcon className='dashboardicon' />
                                </ListItemIcon>
                                <ListItemText primary="Type Of Bird List" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </NavLink>
                <NavLink to="/admin-manage-bird" style={{ textDecoration: "none", color: "black", width: "80%", marginLeft: "1rem", marginTop: "-10px" }}>
                    <List>
                        <ListItem disablePadding sx={{ display: 'block' }} className='list_menu_choice'>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                className='menuicon'
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <MailIcon className='dashboardicon' />
                                </ListItemIcon>
                                <ListItemText primary="Bird List" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </NavLink>

                <NavLink to="/admin-manage-employee" style={{ textDecoration: "none", color: "black", width: "80%", marginLeft: "1rem", marginTop: "-10px" }}>
                    <List>
                        <ListItem disablePadding sx={{ display: 'block' }} className='list_menu_choice'>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                className='menuicon'
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <MailIcon className='dashboardicon' />
                                </ListItemIcon>
                                <ListItemText primary="Employee List" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </NavLink>

                <NavLink to="/admin-manage-voucher" style={{ textDecoration: "none", color: "black", width: "80%", marginLeft: "1rem", marginTop: "-10px" }}>
                    <List>
                        <ListItem disablePadding sx={{ display: 'block' }} className='list_menu_choice'>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                className='menuicon'
                            >

                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <MailIcon className='dashboardicon' />
                                </ListItemIcon>
                                <ListItemText primary="Voucher List" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </NavLink>
                {/* END LIST MENU CHOICE */}
            </Drawer>
        </Box>
    );
}