import { Grid, makeStyles, Container } from "@material-ui/core";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2)
    },
    title: {
        fontSize: "1.5em",
        padding: theme.spacing(2)
    },
    header: {
        fontSize: "1.2em",
        padding: theme.spacing(1),
        textAlign: "center",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    item: {
        fontSize: "1.2em",
        padding: theme.spacing(1),
        textAlign: "center"
    },
    break: {
        fontSize: "1.2em",
        textAlign: "center",
        padding: theme.spacing(1),
        backgroundColor: theme.palette.grey.main,
        color: theme.palette.grey.contrastText
    }
}));
const TourStructure = ({ levels }) => {
    const classes = useStyles();


    if (levels) {
        let count = 1;
        for (let i = 0; i < levels.length; i++) {
            if (levels[i].levelType !== "break") {
                levels[i].level = count;
                count++;
            }
        }
    }

    if (levels && levels.length > 0) {
        return (<Container>
            <Grid container className={classes.root}>
                <Grid item xs={12} className={classes.title}>Tournament Structure</Grid>
                <Grid item xs={2} className={classes.header}>Level</Grid>
                <Grid item xs={2} className={classes.header}>Big Blind</Grid>
                <Grid item xs={2} className={classes.header}>Small Blind</Grid>
                <Grid item xs={2} className={classes.header}>Ante</Grid>
                <Grid item xs={2} className={classes.header}>Big Blind Ante</Grid>
                <Grid item xs={2} className={classes.header}>Duration</Grid>
                {

                    levels.map((level, index) => {
                        return (
                            <Fragment key={index}>
                                {
                                    level.levelType === "break" ?
                                        (<>
                                            <Grid item xs={10} className={classes.break}>BREAK</Grid>
                                            <Grid item xs={2} className={classes.break}>{level.duration} Minutes</Grid>
                                        </>) :
                                        (<>
                                            <Grid item xs={2} className={classes.item}>{level.level}</Grid>
                                            <Grid item xs={2} className={classes.item}>{level.bigBlind}</Grid>
                                            <Grid item xs={2} className={classes.item}>{level.smallBlind}</Grid>
                                            <Grid item xs={2} className={classes.item}>{level.ante}</Grid>
                                            <Grid item xs={2} className={classes.item}>{level.bigBlindAnte}</Grid>
                                            <Grid item xs={2} className={classes.item}>{level.duration}</Grid>
                                        </>)
                                }
                            </Fragment>
                        );
                    })
                }
            </Grid>
        </Container>
        )
    }

    return null;
};

export default TourStructure;