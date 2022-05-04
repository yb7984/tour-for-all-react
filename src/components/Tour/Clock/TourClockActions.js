import { makeStyles, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import {
    tourClockForward, tourClockPause, tourClockPlay, tourClockRewind, tourClockSkipNext, tourClockSkipPrevious, tourClockStop
} from "../../../actions/clock";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import StopIcon from '@material-ui/icons/Stop';
import { TOUR_STATUS_ENDED, TOUR_STATUS_PUBLIC, TOUR_STATUS_STARTED } from "../../../models/tourStatus";
import { memo, useState } from "react";
import { ConfirmDialog } from "../../common";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        borderRadius: "50px",
        margin: theme.spacing(1)
    },
    actions: {
        fontSize: "3em",
        textAlign: "center"
    },
    button: {
        color: theme.palette.primary.contrastText,
        width: "75px",
        height: "75px",
        [theme.breakpoints.down("sm")]: {
            width: "50px",
            height: "50px",
        }
    }
}));
const TourClockActions = memo((props) => {
    const classes = useStyles();

    const {
        clock, tour, username,
        tourClockSkipPrevious, tourClockRewind, tourClockPlay, tourClockPause,
        tourClockSkipNext, tourClockForward, tourClockStop
    } = props;

    const started = tour.status === TOUR_STATUS_STARTED;

    const canEdit = tour.creator === username;
    const canStart = [TOUR_STATUS_PUBLIC, TOUR_STATUS_STARTED, TOUR_STATUS_ENDED].includes(tour.status);

    const [stopConfirm, setStopConfirm] = useState(false);



    const handleSkipPrevious = () => {
        tourClockSkipPrevious(canEdit);
    }
    const handleRewind = () => {
        tourClockRewind(canEdit);
    }
    const handlePlay = () => {
        tourClockPlay(canEdit);
    }
    const handlePause = () => {
        tourClockPause(tour, clock, canEdit);
    }
    const handleStop = () => {
        setStopConfirm(true);
    }
    const handleCloseStopConfirm = (confirm) => {
        setStopConfirm(false);

        if (confirm === true) {
            tourClockStop(canEdit);
        }
    }
    const handleForward = () => {
        tourClockForward(canEdit);
    }
    const handleSkipNext = () => {
        tourClockSkipNext(canEdit);
    }

    return (
        <div className={classes.root}>
            {started && canEdit ?
                <IconButton color="primary" onClick={handleSkipPrevious}> <SkipPreviousIcon className={classes.button} /> </IconButton> : <></>}

            {started && canEdit ?
                <IconButton color="primary" onClick={handleRewind}> <FastRewindIcon className={classes.button} /> </IconButton> : <></>}

            {!canEdit || !canStart || clock.playing ? <></> :
                <IconButton color="primary" onClick={handlePlay}> <PlayArrowIcon className={classes.button} /> </IconButton>}

            {clock.playing && canEdit ?
                <IconButton color="primary" onClick={handlePause}> <PauseIcon className={classes.button} /> </IconButton> : <></>}

            {started && canEdit ?
                <IconButton color="primary" onClick={handleStop}> <StopIcon className={classes.button} /> </IconButton> : <></>}

            {started && canEdit ?
                <IconButton color="primary" onClick={handleForward}> <FastForwardIcon className={classes.button} /> </IconButton> : <></>}

            {started && canEdit ?
                <IconButton color="primary" onClick={handleSkipNext}> <SkipNextIcon className={classes.button} /> </IconButton> : <></>}
            <ConfirmDialog open={stopConfirm} message="Are you sure to end this tournament" handleClose={handleCloseStopConfirm} />
        </div>);
});


const mapStateToProps = (state) => ({
    username: state.auth.username
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        tourClockSkipPrevious: (canEdit) => dispatch(tourClockSkipPrevious(ownProps.tour, ownProps.clock, canEdit)),
        tourClockRewind: (canEdit) => dispatch(tourClockRewind(ownProps.tour, ownProps.clock, canEdit)),
        tourClockPlay: (canEdit) => dispatch(tourClockPlay(ownProps.tour, ownProps.clock, canEdit)),
        tourClockPause: (canEdit) => dispatch(tourClockPause(ownProps.tour, ownProps.clock, canEdit)),
        tourClockStop: (canEdit) => dispatch(tourClockStop(ownProps.tour, ownProps.clock, canEdit)),
        tourClockForward: (canEdit) => dispatch(tourClockForward(ownProps.tour, ownProps.clock, canEdit)),
        tourClockSkipNext: (canEdit) => dispatch(tourClockSkipNext(ownProps.tour, ownProps.clock, canEdit)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TourClockActions);