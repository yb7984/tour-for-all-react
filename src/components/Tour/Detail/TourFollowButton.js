import { IconButton, makeStyles, CircularProgress, Tooltip } from '@material-ui/core';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import { connect } from 'react-redux';
import { followTour } from '../../../actions/users';
import { SnackAlert } from "../../common";
import { useState } from 'react';
import { TOUR_STATUS_CANCELED, TOUR_STATUS_PRIVATE } from '../../../models/tourStatus';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: "gold"
    }
}));

/** Button for add to favorite and remove from favorite */
const TourFollowButton = (props) => {
    const classes = useStyles();

    const {
        tour,
        username, user,
        followTour
    } = props;


    const following = user && user.followingTours.includes(tour.id);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [updating, setUpdating] = useState(false);


    const handleFollow = () => {
        setUpdating(true);
        followTour(username, following, setLoading, setError);
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
        <><Tooltip title={following ? "Remove from Favorites" : "Add to Favorites"}>
            <div>
                <IconButton onClick={handleFollow} >
                    {
                        loading ?
                            <CircularProgress /> : (
                                following ?
                                    <StarIcon className={classes.icon} /> :
                                    <StarOutlineIcon className={classes.icon} />
                            )
                    }

                </IconButton>
            </div>
        </Tooltip>

            <SnackAlert open={updating && !loading && !error}
                message={`Successfully ${following ? "follow" : "defollow"} this tournament!`}
                handleClose={handleAlertClose} />
            <SnackAlert open={updating && !loading && error}
                message={`Error when trying to ${following ? "defollow" : "follow"} this tournament!`}
                serverity="error"
                handleClose={handleAlertClose} />
        </>
    );
}


const mapStateToProps = (state) => ({
    username: state.auth.username,
    user: state.users[state.auth.username]
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        followTour: (username, following, setLoading, setError) => dispatch(followTour(username, ownProps.tour.id, !following, setLoading, setError)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TourFollowButton);