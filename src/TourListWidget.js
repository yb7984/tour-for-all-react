import { Grid, Button, makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TourListItem from "./TourListItem";
import Loading from './Loading';
import { getTourWidget } from "./actions/tours";

const useStyles = makeStyles((theme) => ({
    root: {
    },
    title: {
        fontSize: "3em",
        padding: theme.spacing(2)
    },
    listItem: {
        padding: "10px"
    },
    error: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText
    }
}));

const TourListWidget = ({ listType = "public", perPage = 6 }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const widget = useSelector(st => st.tours.widgets[listType]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const searchParams = {};
    const username = useSelector(st => st.auth.username);
    let title = "";

    switch (listType) {
        case "mine":
            title = "My Tournaments";
            searchParams["creator"] = username;
            break;
        case "joined":
            title = "Joined Tournaments";
            searchParams["username"] = username;
            searchParams["isActive"] = true;
            break;
        case "favorite":
            title = "My Favorites";
            searchParams["username"] = username;
            searchParams["isActive"] = true;
            break;
        case "upcoming":
            title = "Upcoming Tournaments";
            // only get the result with isActive = true
            searchParams["isActive"] = true;
            break;
        case "running":
            title = "Currently Running";
            // only get the result with isActive = true
            searchParams["isActive"] = true;
            break;
        case "past":
            title = "Past Tournaments";
            // only get the result with isActive = true
            searchParams["isActive"] = true;
            break;
        default:
    }

    useEffect(() => {
        async function loadTour() {
            if ((widget.perPage === 0 || widget.reload) && !loading && !error) {
                dispatch(getTourWidget(searchParams, perPage, listType, setLoading, setError));
            }
        }
        loadTour();
        // eslint-disable-next-line
    }, [widget]);

    if (loading) {
        return <Loading />;
    }
    return (
        <>
            <Grid container>
                <Grid item xs={12} className={classes.title}>
                    {title}
                </Grid>
                {
                    widget.tours.map(tour => (
                        <Grid item xs={12} sm={6} md={4} key={tour.id} className={classes.listItem}>
                            <TourListItem tour={tour} />
                        </Grid>
                    ))
                }
                {
                    error && (
                        <Grid item xs={12} className={classes.loadMoreRow}>
                            <Button variant="contained" className={classes.error}>
                                Error when loading data!
                            </Button>
                        </Grid>
                    )
                }
            </Grid>
        </>
    );
}

export default TourListWidget;