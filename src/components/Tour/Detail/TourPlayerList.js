import { ROLE_ADMIN } from "../../../models/role";
import { UserChip } from "../../common";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2)
    },
    title: {
        fontSize: "1.5em",
        padding: theme.spacing(2)
    },
    chips: {
        '& > *': {
            margin: theme.spacing(0.5),
            fontSize: "1.5em",
            padding: theme.spacing(1)
        },
    }
}));

const TourPlayerList = ({ tour, user }) => {
    const classes = useStyles();

    const canShow = user && (tour.creator === user.username || user.role === ROLE_ADMIN);

    if (!canShow) {
        return null;
    }

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.title}>Players</Grid>
            <Grid item xs={12} className={classes.chips}>
                {
                    Object.keys(tour.players).map(username => (
                        <UserChip key={username} username={username} />
                    ))
                }
            </Grid>
        </Grid>)

}


export default TourPlayerList;