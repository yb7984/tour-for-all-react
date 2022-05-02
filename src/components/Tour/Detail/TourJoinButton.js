import { IconButton, makeStyles, CircularProgress, Chip, Tooltip } from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinTour } from '../../../actions/tours';
import { TOUR_STATUS_CANCELED, TOUR_STATUS_ENDED, TOUR_STATUS_PRIVATE } from '../../../models/tourStatus';
import { SnackAlert } from "../../common";

const useStyles = makeStyles((theme) => ({
    gold: {
        color: "gold"
    },
    white: {
        color: "white"
    }
}));

const TourJoinButton = ({ tour }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const username = useSelector(st => st.auth.username);
    const bought = Object.keys(tour.players).includes(username);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [updating, setUpdating] = useState(false);
    const canJoin = ![TOUR_STATUS_CANCELED, TOUR_STATUS_ENDED, TOUR_STATUS_PRIVATE].includes(tour.status);

    const handleJoin = () => {
        if (!canJoin) {
            return;
        }
        setUpdating(true);
        dispatch(joinTour(tour.id, username, !bought, setLoading, setError));
    }


    const handleAlertClose = (event, reason) => {
        setUpdating(false);
    };

    if (!username) {
        return null;
    }

    if ([TOUR_STATUS_CANCELED, TOUR_STATUS_PRIVATE].includes(tour.status)) {
        return null;
    }
    return (
        <>
            <Tooltip title={bought ? "Quit this Tournament" : "Join this Tournament"}>
                <div>
                    <IconButton color="inherit" className={bought ? classes.gold : classes.white} onClick={handleJoin}>
                        {loading ? <CircularProgress /> : (<>{bought ?
                            (<>
                                <Chip label="Joined" color="primary" className={classes.gold} />
                                {canJoin ? <MoneyOffIcon /> : ""}
                            </>) : <MoneyIcon />}</>)}
                    </IconButton>
                </div>
            </Tooltip>
            <SnackAlert open={updating && !loading && !error}
                message={`Successfully ${bought ? "join in" : "quit"} this tournament!`}
                handleClose={handleAlertClose} />
            <SnackAlert open={updating && !loading && error}
                message={`Error when trying to ${bought ? "quit" : "join in"} this tournament!`}
                serverity="error"
                handleClose={handleAlertClose} />
        </>
    );
}
export default TourJoinButton;