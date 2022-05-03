import { makeStyles, Typography, IconButton } from "@material-ui/core";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { memo } from "react";
import { connect } from "react-redux";
import { tourClockAddPlayer, tourClockRemovePlayer } from "../../../actions/clock";
import { TOUR_STATUS_STARTED } from "../../../models/tourStatus";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        borderRadius: "50px",
        padding: theme.spacing(2),
        margin: theme.spacing(1)
    },
    label: {
        fontSize: "1.5em",
        textAlign: "center",
        textDecoration: "underline",
        color: theme.palette.secondary.light,
    },
    value: {
        fontSize: "2.5em",
        textAlign: "center",
        paddingRight: theme.spacing(3),
        color: theme.palette.primary.contrastText,
    }
}));


const TourClockPlayersLeft = memo((props) => {
    const classes = useStyles();

    const { clock, tour, canEdit, tourClockAddPlayer, tourClockRemovePlayer } = props;

    const started = tour.status === TOUR_STATUS_STARTED;

    const handleAddPlayer = () => {
        tourClockAddPlayer();
    }
    const handleRemovePlayer = () => {
        tourClockRemovePlayer();
    }

    return (<div className={classes.root}>
        <Typography className={classes.label}>
            Pleyers Remain
        </Typography>
        <Typography className={classes.value}>
            {started && canEdit ? <IconButton onClick={handleRemovePlayer}><RemoveCircleOutlineIcon color="secondary" /></IconButton> : <></>}
            {clock.playersLeft}
            {started && canEdit ? <IconButton onClick={handleAddPlayer}><ControlPointIcon color="secondary" /></IconButton> : <></>}
        </Typography>
    </div>);
});


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        tourClockAddPlayer: () => dispatch(tourClockAddPlayer(ownProps.tour, ownProps.clock, ownProps.canEdit)),
        tourClockRemovePlayer: () => dispatch(tourClockRemovePlayer(ownProps.tour, ownProps.clock, ownProps.canEdit)),
    };
};

export default connect(null, mapDispatchToProps)(TourClockPlayersLeft);