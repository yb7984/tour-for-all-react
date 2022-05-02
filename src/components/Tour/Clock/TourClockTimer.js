import { makeStyles } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { formatNumber2Digits } from "../../../helpers/date";
import { TOUR_STATUS_ENDED, TOUR_STATUS_PUBLIC, TOUR_STATUS_STARTED } from "../../../models/tourStatus";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        borderRadius: "50px",
        margin: theme.spacing(1),
        height: "95%"
    },
    level: {
        color: theme.palette.secondary.light,
        fontSize: "3em",
        textAlign: "center"
    },
    timeLeft: {
        fontSize: "8em",
        height: "200px",
        textAlign: "center",
        color: theme.palette.primary.contrastText
    },
    timeTo: {
        fontSize: "5em",
        height: "200px",
        textAlign: "center",
        color: theme.palette.primary.contrastText
    }
}));

const TourClockTimer = ({ clock, tour }) => {
    const classes = useStyles();

    const [count, setCount] = useState(Math.floor((tour.start.getTime() - Date.now()) / 1000));

    const timer = useRef(null);

    useEffect(() => {
        if (tour.status === TOUR_STATUS_PUBLIC) {
            if (!timer.current) {
                timer.current = setInterval(() => {
                    setCount(count => {

                        if (count <= 0) {
                            clearInterval(timer.current);
                        }
                        return (count - 1);
                    });
                }, 1000);
            }
        }
        return () => {
            if (timer.current) {
                clearInterval(timer.current);
            }
        }
    }, [tour.status])


    function formatTime(count) {
        const days = Math.floor(count / (3600 * 24));
        const hours = Math.floor(count / 3600) % 24;
        const minutes = Math.floor(count / 60) % 60;
        const seconds = count % 60;

        let str = "";

        if (days > 0) {
            str += `${days} Days `;
        }
        if (hours > 0) {
            str += `${hours}:`;
        }
        str += `${formatNumber2Digits(minutes)}:${formatNumber2Digits(seconds)}`;

        return str;
    }

    if (tour.status === TOUR_STATUS_PUBLIC) {
        return (
            <div className={classes.root}>
                <div className={classes.level}>Starting in </div>
                <div className={classes.timeTo}>{formatTime(count)}</div>
            </div>
        );
    } else if ([TOUR_STATUS_STARTED, TOUR_STATUS_ENDED].includes(tour.status)) {
        return (
            <div className={classes.root}>
                <div className={classes.level}>{clock.levelName}</div>
                <div className={classes.timeLeft}>{clock.showTime}
                </div>
            </div>
        );
    }

    return (<div></div>);
}

export default TourClockTimer;