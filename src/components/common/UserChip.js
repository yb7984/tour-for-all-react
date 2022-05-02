import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/users";
import { Avatar, Chip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: "1.2em"
    },
}));

const UserChip = memo(({ username, color = "primary", showName = true }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(st => st.users[username]);

    useEffect(() => {
        if (!user) {
            dispatch(getUser(username));
        }
    }, [user, username, dispatch]);

    if (user) {
        return (
            <Chip color={color} className={classes.root}
                avatar={<Avatar alt={user.username} src={user.imageUrl} />}
                label={showName && user.fullName} />);
    }
    return null;
});

export default UserChip;