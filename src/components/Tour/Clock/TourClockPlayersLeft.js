import { makeStyles, Typography, IconButton } from "@material-ui/core";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { memo } from "react";
import { useDispatch } from "react-redux";
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


const TourClockPlayersLeft = memo(({ clock, tour, canEdit }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const started = tour.status === TOUR_STATUS_STARTED;

    const handleAddPlayer = () => {
        dispatch(tourClockAddPlayer(tour, clock, canEdit));
    }
    const handleRemovePlayer = () => {
        dispatch(tourClockRemovePlayer(tour, clock, canEdit));
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


export default TourClockPlayersLeft;