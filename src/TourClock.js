import { Container, Grid, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadClock, tourClockPlay, removeClock, gotClock, connectClockSocket } from "./actions/clock";
import Loading from "./Loading";
import { TOUR_STATUS_ENDED, TOUR_STATUS_PUBLIC, TOUR_STATUS_STARTED } from "./models/tourStatus";
import Clock from "./models/clock";
import TourClockIndicator from './TourClockIndicator';
import TourClockPlayersLeft from "./TourClockPlayersLeft";
import TourClockLevel from "./TourClockLevel";
import TourClockActions from "./TourClockActions";
import TourClockTimer from "./TourClockTimer";


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    current: {
        order: 0,
        [theme.breakpoints.down("sm")]: {
            order: 1
        }
    },
    level: {
        order: 0
    },
    next: {
        order: 3,
    },
    status: {
        order: 3,
        textAlign: "center"
    },
    actions: {
        order: 3,
        textAlign: "center",
        [theme.breakpoints.down("sm")]: {
            order: 0
        }
    }
}));
const TourClock = ({ tour }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const username = useSelector(st => st.auth.username);
    const clock = useSelector(st => st.clocks[tour.id]);
    const currentLevel = clock && clock.currentLevel;
    const nextLevel = clock && clock.nextLevel;

    const canEdit = tour.creator === username;
    const canStart = [TOUR_STATUS_PUBLIC, TOUR_STATUS_STARTED, TOUR_STATUS_ENDED].includes(tour.status);

    if (clock) {
        // update the entries
        if (clock.entries !== Object.keys(tour.players).length) {
            dispatch(gotClock(new Clock({
                ...clock,
                entries: Object.keys(tour.players).length
            })));
        }
    }

    if (canStart) {
        dispatch(connectClockSocket(tour));         // make sure the clock is connected
    }

    useEffect(() => {
        if (!clock) {
            //load the clock if not ready
            dispatch(loadClock(tour));
        }

        if (!canEdit) {
            // if not clock manager, remove the clock from redux when close the window
            return () => {
                dispatch(removeClock(tour));
            }
        }

        //make sure the clock remain running even after reload
        if (clock && clock.playing === true) {
            dispatch(tourClockPlay(tour, clock, canEdit));
        }
        // eslint-disable-next-line
    }, []);         // only execute once

    if (tour && clock) {
        return (
            <Container className={classes.root}>
                <Grid container>
                    <Grid item xs={6} sm={6} md={3} className={classes.current}>
                        <TourClockLevel level={currentLevel} label="Current Level" />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.level}>
                        <TourClockTimer clock={clock} tour={tour} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={3} className={classes.next}>
                        <TourClockLevel level={nextLevel} label="Next Level" />
                    </Grid>
                    <Grid item xs={6} md={3} className={classes.status}>
                        <TourClockIndicator label="Entries" value={clock.entries} />
                    </Grid>
                    <Grid item xs={6} md={3} className={classes.status}>
                        <TourClockPlayersLeft clock={clock} tour={tour} canEdit={canEdit} />
                    </Grid>
                    <Grid item xs={6} md={3} className={classes.status}>
                        <TourClockIndicator label="Average Stack" value={clock.averageStack} />
                    </Grid>
                    <Grid item xs={6} md={3} className={classes.status}>
                        <TourClockIndicator label="Total Chips" value={clock.totalChips} />
                    </Grid>
                    <Grid item xs={12} className={classes.actions}>
                        <TourClockActions clock={clock} tour={tour} />
                    </Grid>
                </Grid>
            </Container>
        );
    }

    return <Loading />;
}

export default TourClock;