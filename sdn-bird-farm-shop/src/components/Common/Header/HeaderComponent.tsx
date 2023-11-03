import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import LinkTab from "@mui/material/Tab";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
    bindMenu,
    bindTrigger,
    usePopupState,
} from "material-ui-popup-state/hooks";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./HeaderComponent.css";
import { left } from "@popperjs/core";

type Anchor = "top" | "left" | "bottom" | "right";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));

export default function HeaderComponent() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const [isLogigned, setIsLogined] = React.useState<string | null>();

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const [value, setValue] = React.useState(0);

    const handleChange = (newValue: number) => {
        setValue(newValue);
    };

    const [state, setState] = React.useState({
        top: false,
        bottom: false,
    });

    const [isBirdPopupOpen, setBirdPopupOpen] = React.useState(false);

    const handleBirdMouseEnter = () => {
        setBirdPopupOpen(true);
    };

    const handleBirdMouseLeave = () => {
        setBirdPopupOpen(false);
    };

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event &&
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
                (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    React.useEffect(() => {
        const logined = localStorage.getItem("isLogined");
        setIsLogined(logined);
    }, []);

    const hanldeLogout = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("isLogined", "");
        localStorage.setItem("decode", "");
        window.location.href = "/auth/login";
    };

    const handleLogin = () => {
        window.location.href = "/auth/login";
    };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === "top" ? "auto" : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {[
                    "Bird Shop",
                    "Matching bird",
                    "Parrot ",
                    "Woodpecker",
                    "Sparrow",
                    "Crow",
                ].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => handleChangePage(index)}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    const handleChangePage = (index: number) => {
        if (index === 0) {
            window.location.href = "/bird";
        }
    };

    return (
        <AppBar
            className="header-component"
            position="fixed"
            sx={{ backgroundColor: "white", zIndex: "10" }}
        >
            {/* <Container className='header-component--banner' maxWidth="xl">
                <Toolbar>
                    <Typography variant="h4" >CARDONE</Typography>
                    <Typography variant="h6" style={{ fontSize: '1em', fontWeight: 'bold' }}>UPGRADE to a Fully-fledged Kardone!</Typography>
                    <Typography variant="subtitle1"><span>Featuring a additional pages, plugins, beautiful pictures and fully functionality!</span></Typography>
                    <Button variant="contained">Shop now!</Button>
                </Toolbar>
            </Container> */}
            {/* <Container className='header-component--infor' maxWidth="xl" sx={{ height: '60px'}}>
                <Toolbar sx={{ marginLeft: '150px', display: 'flex', alignItems: 'center' }}>
                    <Typography><FacebookIcon className='header-component--infor__icon' sx={{ fontSize: '30px', marginRight:'10px' }}></FacebookIcon></Typography>
                    <Typography><TwitterIcon className='header-component--infor__icon' sx={{ fontSize: '30px', marginRight:'10px' }}></TwitterIcon></Typography>
                    <Typography><InstagramIcon className='header-component--infor__icon' sx={{ fontSize: '30px', marginRight:'10px' }}></InstagramIcon></Typography>
                    <Typography><YouTubeIcon className='header-component--infor__icon' sx={{ fontSize: '30px' }}></YouTubeIcon></Typography>
                    <Typography className='header-component--infor__span' sx={{ paddingBottom: '0px', paddingLeft:'700px' }}>
                        <span>Localtion: 123, Akalaka, FPTU Mana</span>
                    </Typography>
                </Toolbar>
            </Container> */}
            <Container
                maxWidth="xl"
                sx={{ backgroundColor: "white", fontWeight: "bold" }}
            >
                <Toolbar disableGutters sx={{ backgroundColor: "white" }}>
                    <img className="logo" src="/logo_bird.jpg" alt="birdlogo" />

                    <Box sx={{ width: "100%", backgroundColor: "white" }}>
                        <Tabs sx={{ width: "100%", backgroundColor: "white" }} centered>
                            <LinkTab
                                className="button-with-border"
                                label="Home"
                                href="/"
                                style={{
                                    color: "black",
                                    margin: "5px",
                                    fontSize: "16px",
                                    marginLeft: "10px",
                                }}
                            />
                            <LinkTab
                                className="button-with-border"
                                label="Bird Shop"
                                href="/bird"
                                style={{
                                    color: "black",
                                    margin: "5px",
                                    fontSize: "16px",
                                    marginLeft: "10px",
                                }}
                            />
                            {/* <Button
                onMouseEnter={handleBirdMouseEnter}
                onMouseLeave={handleBirdMouseLeave}
                className="button-with-border"
                onClick={toggleDrawer("top", true)}
                style={{ color: "black", margin: "5px", fontSize: "16px" }}
              >
                Bird Shop
              </Button> */}
                            {/* <SwipeableDrawer
                anchor="top"
                open={state.top}
                onClose={toggleDrawer("top", false)}
                onOpen={toggleDrawer("top", true)}
                style={{ marginTop: "100px" }}
              >
                {list("top")}
              </SwipeableDrawer> */}

                            {/* <PopupStateComponent label="Nest" isActive={true} index={0} />
              <PopupStateComponent label="Food" isActive={true} index={1} /> */}
                            <LinkTab
                                className="button-with-border"
                                label="Matching Bird"
                                href="/matching-bird"
                                style={{ color: "black", margin: "5px", fontSize: "16px" }}
                            />
                            <PopupStateComponent label="About Us" isActive={true} index={3} />
                            <PopupStateComponent
                                label="Contact Us"
                                isActive={true}
                                index={3}
                            />
                        </Tabs>
                    </Box>
                    <Box sx={{ display: "flex", marginRight: "50px" }}>
                        <IconButton aria-label="cart" sx={{ marginRight: "15px" }}>
                            <StyledBadge color="secondary">
                                <Link href="/cart">
                                    <ShoppingCartIcon />
                                </Link>
                            </StyledBadge>
                        </IconButton>
                        <IconButton>
                            <Badge color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ marginRight: "50px" }}
                            >
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuItem onClick={handleCloseUserMenu}>
                                <Button href="/user-profile">
                                    <Typography textAlign="center">User Profile</Typography>
                                </Button>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Button onClick={hanldeLogout} href="/user-profile">
                                    <Typography textAlign="center">Log out</Typography>
                                </Button>
                            </MenuItem>

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

function PopupStateComponent({
    label,
    isActive,
    index,
}: {
    label: string;
    isActive: boolean;
    index: number;
}) {
    const popupState = usePopupState({
        variant: "popover",
        popupId: `demo-popup-menu-${label}`,
    });

    return (
        <React.Fragment>
            <Button
                className="button-with-border"
                style={{ color: "black", margin: "5px", fontSize: "16px" }}
                {...bindTrigger(popupState)}
            >
                {label}
            </Button>
            {index === 0 ? (
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>
                        <LinkTab label="Page One" href="/#" />
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                        <LinkTab label="Page One" href="/#" />
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                        <LinkTab label="Page One" href="/#" />
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                        <LinkTab label="Page One" href="/#" />
                    </MenuItem>
                </Menu>
            ) : index === 1 ? (
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>
                        <LinkTab label="Page One" href="/#" />
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                        <LinkTab label="Page One" href="/#" />
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                        <LinkTab label="Page One" href="/#" />
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                        <LinkTab label="Page One" href="/#" />
                    </MenuItem>
                </Menu>
            ) : index === 2 ? (
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>
                        <LinkTab label="Page One" href="/#" />
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                        <LinkTab label="Page One" href="/#" />
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                        <LinkTab label="Page One" href="/#" />
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                        <LinkTab label="Page One" href="/#" />
                    </MenuItem>
                </Menu>
            ) : index === 3 ? (
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>
                        <LinkTab label="Page One" href="/#" />
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                        <LinkTab label="Page One" href="/#" />
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                        <LinkTab label="Page One" href="/#" />
                    </MenuItem>
                    <MenuItem onClick={popupState.close}>
                        <LinkTab label="Page One" href="/#" />
                    </MenuItem>
                </Menu>
            ) : (
                ""
            )}
        </React.Fragment>
    );
}
