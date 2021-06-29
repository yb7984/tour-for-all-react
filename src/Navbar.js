import {
    makeStyles, AppBar, Toolbar, Typography, IconButton,
    Button, Avatar, Box, SvgIcon,
    Drawer, List, ListItem, ListItemText, Divider, ListItemAvatar, ListItemIcon
} from "@material-ui/core";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./actions/auth";
import { useEffect, useState } from "react";
import { ReactComponent as PokerIcon } from './images/poker1.svg';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import StarsIcon from '@material-ui/icons/Stars';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { getUser } from "./actions/users";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },
    titleButton: {
        fontWeight: 500,
        fontSize: "1.2em"
    },
    titleIcon: {
        marginRight: theme.spacing(2),
    },
    avatarVertical: {
    },
    avatarHorizontal: {
        minWidth: "36px",
        width: '30px'
    },
    avatar: {
        width: '30px',
        height: "30px"
    },
    avatarText: {
        color: "lightgreen"
    },
    list: {
        width: '250px'
    },
    menuVertical: {
    },
    listVertical: {
    },
    menuHorizontal: {
        display: "flex",
        flexDirection: "row",
        padding: 0
    },
    listHorizontal: {
        display: "flex",
        flexDirection: "row",
        padding: 0,
        whiteSpace: "nowrap"
    },
    listItemVertical: {},
    listItemHorizontal: {
        paddingLeft: "5px",
        paddingRight: "5px"
    }
}));

const Navbar = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const username = useSelector(st => st.auth.username);
    const user = useSelector(st => st.users[username]);

    const [menuOpen, setMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (username && !user) {
            dispatch(getUser(username, setLoading, setError));
        }
    }, [username, dispatch, user]);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setMenuOpen(open);
    };

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(logout());

        history.push("/login");
    }

    const menuList = (vertical = true) => {

        const menu = vertical ? classes.menuVertical : classes.menuHorizontal;
        const list = vertical ? classes.listVertical : classes.listHorizontal;;
        const listItem = vertical ? classes.listItemVertical : classes.listItemHorizontal;

        return (<div className={menu}>
            <List className={list}>
                <ListItem button component={NavLink} to="/" className={listItem}>
                    {vertical && <ListItemIcon><HomeIcon /></ListItemIcon>}
                    <ListItemText>Home</ListItemText>
                </ListItem>
                <ListItem button component={NavLink} to="/tours" className={listItem}>
                    {vertical &&
                        <ListItemIcon><SvgIcon><PokerIcon /></SvgIcon></ListItemIcon>}
                    <ListItemText>Tournaments</ListItemText>
                </ListItem>
            </List>
            <Divider />
            {
                user ? (
                    <List className={list}>
                        <ListItem className={listItem}>
                            <ListItemAvatar className={vertical ? classes.avatarVerical : classes.avatarHorizontal}>
                                <Avatar alt={username} src={user.imageUrl} className={classes.avatar} />
                            </ListItemAvatar>
                            <ListItemText className={classes.avatarText}>{user.username}</ListItemText>
                        </ListItem>
                        <ListItem button component={NavLink} to="/profile" className={listItem}>
                            {vertical && <ListItemIcon><AccountBoxIcon /></ListItemIcon>}
                            <ListItemText>Profile</ListItemText>
                        </ListItem>
                        <ListItem button component={NavLink} to="/mytours" className={listItem}>
                            {vertical &&
                                <ListItemIcon><SvgIcon><PokerIcon /></SvgIcon></ListItemIcon>}
                            <ListItemText>My Tours</ListItemText>
                        </ListItem>
                        <ListItem button component={NavLink} to="/myfavorites" className={listItem}>
                            {vertical && <ListItemIcon><StarsIcon /></ListItemIcon>}
                            <ListItemText>Favorites</ListItemText>
                        </ListItem>
                        <ListItem button onClick={handleLogout} className={listItem}>
                            {vertical && <ListItemIcon><ExitToAppIcon /></ListItemIcon>}
                            <ListItemText>Logout</ListItemText>
                        </ListItem>
                    </List>
                ) : (
                    <List className={list}>
                        <ListItem button component={NavLink} to="/login" className={listItem}>
                            {vertical && <ListItemIcon><VerifiedUserIcon /></ListItemIcon>}
                            <ListItemText>Login</ListItemText>
                        </ListItem>
                        <ListItem button component={NavLink} to="/signup" className={listItem}>
                            {vertical && <ListItemIcon><PersonAddIcon /></ListItemIcon>}
                            <ListItemText>Sign up</ListItemText>
                        </ListItem>
                    </List>
                )
            }
        </div>);
    }

    if (error) {
        return (<Typography color="error">
            Error when retrieving data from server!
        </Typography>);
    }

    if (!loading) {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Box display={{ xs: "inline", md: "none" }}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                            onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="left" open={menuOpen} onClose={toggleDrawer(false)}>
                            <div
                                className={classes.list}
                                role="presentation"
                                onClick={toggleDrawer(false)}
                                onKeyDown={toggleDrawer(false)}
                            >
                                {menuList()}
                            </div>
                        </Drawer>
                    </Box>
                    <Typography variant="h6" className={classes.title}>
                        <Button color="inherit" to="/" component={NavLink} className={classes.titleButton}>
                            <SvgIcon className={classes.titleIcon}>
                                <PokerIcon />
                            </SvgIcon>
                            Tour for All
                        </Button>
                    </Typography>
                    <Box display={{ xs: "none", sm: "none", md: "inline" }}>
                        {menuList(false)}
                    </Box>
                </Toolbar>
            </AppBar >
        );
    }
    return (<Loading />);
}

export default Navbar;