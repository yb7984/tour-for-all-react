import { makeStyles, Typography } from "@material-ui/core";
import { memo } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        borderRadius: "50px",
        margin: theme.spacing(1),
        height: "95%"
    },
    label: {
        fontSize: "1.5em",
        textAlign: "center",
        textDecoration: "underline",
        color: theme.palette.secondary.light,
        padding: theme.spacing(2)
    },
    blinds: {
        fontSize: "2em",
        textAlign: "center",
        color: theme.palette.primary.contrastText,
    },
    value: {
        fontSize: "1.2em",
        textAlign: "center",
        paddingRight: theme.spacing(3),
        color: theme.palette.primary.contrastText,
    }
}));

const TourClockLevel = memo(({ label, level }) => {
    const classes = useStyles();

    return (<div className={classes.root}>
        {
            level.levelType === "break" ?
                <Typography className={classes.blinds}>BREAK</Typography> :
                (<>
                    <div className={classes.label}>
                        {label}
                    </div>
                    <div className={classes.blinds}>
                        Blinds
                        <div className={classes.value}>{level.smallBlind}/{level.bigBlind}</div>
                    </div>
                    <div className={classes.blinds}>
                        Ante:
                        <span className={classes.value}>{level.ante}</span>
                    </div>
                    <div className={classes.blinds} variant="body1" >
                        BB Ante:
                        <span className={classes.value}>{level.bigBlindAnte}</span>
                    </div>
                </>)
        }</div>);
});


export default TourClockLevel;