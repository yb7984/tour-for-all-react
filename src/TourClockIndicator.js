import { makeStyles, Typography } from "@material-ui/core";
import { memo } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        borderRadius: "50px",
        padding:theme.spacing(2),
        margin:theme.spacing(1)
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
        color:theme.palette.primary.contrastText,
    }
}));

const TourClockIndicator = memo(({ label, value }) => {
    const classes = useStyles();

    return (<div className={classes.root}>
        <Typography className={classes.label}>
            {label}
        </Typography>
        <Typography className={classes.value}>
            {value}
        </Typography>
    </div>);
});


export default TourClockIndicator;