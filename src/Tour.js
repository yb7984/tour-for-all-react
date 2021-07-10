import { Dialog, AppBar, Toolbar, IconButton, Typography, makeStyles, Tooltip } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/users";
import { ROLE_ADMIN } from "./models/role";
import TourEditForm from "./TourEditForm";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { deleteTour } from "./actions/tours";
import { useHistory } from "react-router-dom";
import useQueryParams from "./hooks/useQueryParams";
import TourFollowButton from "./TourFollowButton";
import TimerIcon from '@material-ui/icons/Timer';
import TimerOffIcon from '@material-ui/icons/TimerOff';
import TourDetail from "./TourDetail";
import TourClock from "./TourClock";
import TourJoinButton from "./TourJoinButton";
import ConfirmDialog from "./ConfirmDialog";
import TourRefreshButton from "./TourRefreshButton";
import { TOUR_STATUS_PRIVATE, TOUR_STATUS_PUBLIC, TOUR_STATUS_CANCELED } from "./models/tourStatus";
import TourCopyButton from "./TourCopyButton";

const useStyles = makeStyles((theme) => ({
    root: {
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Tour = ({ tour, handleClose = null }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();
    const username = useSelector(st => st.auth.username);
    const user = useSelector(st => st.users[username]);
    const creator = useSelector(st => st.users[tour.creator]);
    const [edit, setEdit] = useState(false);
    const [clock, setClock] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const { pathname, search } = useQueryParams();

    // only creator and admin can edit
    const canEdit = username &&
        user &&
        (user.role === ROLE_ADMIN || username === tour.creator) &&
        [TOUR_STATUS_PRIVATE, TOUR_STATUS_PUBLIC, TOUR_STATUS_CANCELED].includes(tour.status);

    useEffect(() => {
        if (!creator) {
            dispatch(getUser(tour.creator));
        }
    }, [tour, dispatch, creator]);

    // confirm for delete tour
    const handleDelete = () => {
        setDeleteConfirm(true);
    }

    // if confirmed, delete the tournament
    const handleDeleteConfirm = (confirm) => {
        setDeleteConfirm(false);
        if (confirm === true) {
            dispatch(deleteTour(tour.slug));
        }
    }

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
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {tour.title}
                    </Typography>
                    <TourRefreshButton tour={tour} />
                    {user ? <TourCopyButton tour={tour} /> : <></>}
                    {user ? <TourFollowButton tour={tour} /> : <></>}
                    {user ? <TourJoinButton tour={tour} /> : <></>}
                    {
                        [TOUR_STATUS_PRIVATE, TOUR_STATUS_CANCELED].includes(tour.status) ?
                            <></> : (
                                <Tooltip title={clock ? "Close Clock" : "Open Clock"}>
                                    <div>
                                        <IconButton color="inherit" onClick={handleClock} >
                                            {clock ? <TimerOffIcon /> : <TimerIcon />}
                                        </IconButton>
                                    </div>
                                </Tooltip>
                            )
                    }
                    {
                        canEdit ? (
                            <>
                                <Tooltip title={ edit? "Back to Detail Page": "Edit this Tournament" } >
                                    <div>
                                        <IconButton color="inherit" onClick={handleEdit}>
                                            {edit ? <CancelIcon /> : <EditIcon />}
                                        </IconButton>
                                    </div>
                                </Tooltip>
                                <Tooltip title="Delete this Tournament">
                                    <div>
                                        <IconButton color="inherit" onClick={handleDelete}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </Tooltip>
                                <ConfirmDialog open={deleteConfirm} message="Are you sure you are deleting this tournament?" handleClose={handleDeleteConfirm} />
                            </>
                        ) : <></>
                    }
                </Toolbar>
            </AppBar>
            {clock ? <TourClock tour={tour} /> : <></>}
            {edit ? (<TourEditForm tour={tour} cancelEdit={cancelEdit} />) : <></>}
            {!clock && !edit ? (<TourDetail tour={tour} />) : <></>}
        </Dialog >
    );
};

export default Tour;