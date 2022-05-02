import { memo, useEffect } from "react";
import { connect } from "react-redux";
import { getUser } from "../../actions/users";
import { Avatar, Chip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: "1.2em"
    },
}));

const UserChip = memo((props) => {
    const classes = useStyles();

    const { user, getUser, color, showName } = props;

    useEffect(() => {
        getUser(user);
    }, [user, getUser]);

    if (user) {
        return (
            <Chip color={color} className={classes.root}
                avatar={<Avatar alt={user.username} src={user.imageUrl} />}
                label={showName && user.fullName} />);
    }
    return null;
});

UserChip.defaultProps = {
    username: null,
    color: "primary",
    showName: true
};

const mapStateToProps = (state, ownProps) => ({
    user: state.users[ownProps.username]
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUser: (user) => {
            if (!user) {
                dispatch(getUser(ownProps.username));
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChip);
