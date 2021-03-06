import { Dialog, IconButton, makeStyles, Tooltip, Grid } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUser } from "../../../actions/users";
import { ROLE_ADMIN } from "../../../models/role";
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { useHistory } from "react-router-dom";
import TimerIcon from '@material-ui/icons/Timer';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import { TourDetail, TourEditForm, TourFollowButton, TourJoinButton, TourRefreshButton, TourDeleteButton, TourCopyButton } from "../Detail";
import { TourClock } from "../Clock";
import { TOUR_STATUS_PRIVATE, TOUR_STATUS_PUBLIC, TOUR_STATUS_CANCELED } from "../../../models/tourStatus";
import { useQueryParams } from "../../../hooks";

const useStyles = makeStyles((theme) => ({
    root: {
    },
    appBar: {
        position: 'relative',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(1),
    },
    title: {
        color: theme.palette.primary.contrastText,
        fontSize: "1.5em",
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    actions: {
        justifyContent: "flex-end"
    },
    button: {
        color: theme.palette.primary.contrastText
    }
}));

const Tour = (props) => {
    const classes = useStyles();

    const {
        tour, handleClose,
        username, user, creator,
        getUser
    } = props;

    const history = useHistory();

    const [edit, setEdit] = useState(false);
    const [clock, setClock] = useState(false);

    const { pathname, search } = useQueryParams();

    // only creator and admin can edit
    const canEdit = user && tour &&
        (user.role === ROLE_ADMIN || username === tour.creator) &&
        [TOUR_STATUS_PRIVATE, TOUR_STATUS_PUBLIC, TOUR_STATUS_CANCELED].includes(tour.status);

    useEffect(() => {
        if (!creator) {
            getUser(tour.creator);
        }
    }, [tour, creator, getUser]);


    // toggle edit mode
    const handleEdit = () => {
        setEdit(!edit);
    }

    // exit edit mode
    const cancelEdit = () => {
        setEdit(false);
    }

    // open & close clock
    const handleClock = () => {
        setClock(!clock)
    }


    if (!tour) {
        history.push(`${pathname}${search && search}`);
    }

    return (
        <Dialog fullScreen open={true} onClose={handleClose} className={classes.root}>
            <Grid container className={classes.appBar}>
                <Grid item xs={12} sm={6} className={classes.title}>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <span>
                        {tour.title}
                    </span>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container className={classes.actions}>
                        <TourRefreshButton tour={tour} />
                        {user ? <TourCopyButton tour={tour} /> : <></>}
                        {user ? <TourFollowButton tour={tour} /> : <></>}
                        {user ? <TourJoinButton tour={tour} /> : <></>}
                        {
                            [TOUR_STATUS_PRIVATE, TOUR_STATUS_CANCELED].includes(tour.status) ?
                                <></> : (
                                    <Tooltip title={clock ? "Close Clock" : "Open Clock"}>
                                        <div>
                                            <IconButton color="inherit" onClick={handleClock}>
                                                {clock ? <TimerOffIcon /> : <TimerIcon />}
                                            </IconButton>
                                        </div>
                                    </Tooltip>
                                )
                        }
                        {
                            canEdit ? (
                                <Tooltip title={edit ? "Back to Detail Page" : "Edit this Tournament"} >
                                    <div>
                                        <IconButton color="inherit" onClick={handleEdit}>
                                            {edit ? <CancelIcon /> : <EditIcon />}
                                        </IconButton>
                                    </div>
                                </Tooltip>
                            ) : null
                        }
                        <TourDeleteButton tour={tour} />
                    </Grid>
                </Grid>
            </Grid>
            {clock ? <TourClock tour={tour} /> : <></>}
            {edit ? (<TourEditForm tour={tour} cancelEdit={cancelEdit} />) : <></>}
            {!clock && !edit ? (<TourDetail tour={tour} />) : <></>}
        </Dialog >
    );
};


const mapStateToProps = (state, ownProps) => ({
    username: state.auth.username,
    user: state.users[state.auth.username],
    creator: state.users[ownProps.tour.creator],
});

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (username) => dispatch(getUser(username)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tour);
