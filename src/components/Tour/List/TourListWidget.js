import { Grid, Button, makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TourListItem } from "../../Tour/List";
import { Loading } from '../../common';
import { getTourWidget } from "../../../actions/tours";

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

const TourListWidget = (props) => {
    const classes = useStyles();

    const { listType, perPage, widgets, username, getTourWidget } = props;

    const widget = widgets[listType];
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const searchParams = {};

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
                getTourWidget(searchParams, perPage, listType, setLoading, setError);
            }
        }
        loadTour();
        // eslint-disable-next-line
    }, [widget, getTourWidget]);

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


TourListWidget.defaultProps = { listType: "public", perPage: 6 };

const mapStateToProps = (state) => ({
    widgets: state.tours.widgets,
    detailTours: state.tours.tours,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getTourWidget: (searchParams, perPage, listType, setLoading, setError) => dispatch(getTourWidget(searchParams, perPage, listType, setLoading, setError)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TourListWidget);