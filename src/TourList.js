import { Grid, Button, makeStyles } from "@material-ui/core"
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getTour, getTourList } from "./actions/tours";
import useQueryParams from "./hooks/useQueryParams";
import Tour from "./Tour";
import TourListItem from "./TourListItem";
import Loading from './Loading';
import TourAddForm from "./TourAddForm";
import SnackAlert from "./SnackAlert";

const useStyles = makeStyles((theme) => ({
    root: {
    },
    topRow: {
        textAlign: "right",
        padding: theme.spacing(1),
        fontSize: "1.2em",
        "& button": {
            marginLeft: theme.spacing(2)
        }
    },
    listItem: {
        padding: "10px"
    },
    loadMoreRow: {
        textAlign: "center"
    }
}));

const TourList = ({ type = "public", perPage = 12 }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [loadingTour, setLoadingTour] = useState(false);
    const [error, setError] = useState(false);
    const [errorTour, setErrorTour] = useState(false);

    const { currentPage, total, tours, searchString, listType } = useSelector(st => st.tours.list[type]);
    const { searchParams, search, hash, pathname } = useQueryParams();
    const newListType = useMemo(() => searchParams["listType"] || "upcoming", [searchParams]);

    const slug = hash ? hash.substr(1) : null;          // if got the hash value, would open the tournament detail page
    const tour = useSelector(st => st.tours.tours[slug]);       // 

    useEffect(() => {
        if (
            (currentPage === 0 || search !== searchString || listType !== newListType) &&
            !loading
        ) {
            // when seach condition change or first time here, fetch the first page data.
            dispatch(getTourList(search, searchParams, 1, perPage, newListType, type, setLoading, setError));
        }
    }, [setLoading, setError, currentPage, perPage, searchParams, search, searchString, loading, newListType, type, listType, dispatch]);


    useEffect(() => {
        if (slug && slug !== "new" && !tour) {
            // when get slug and the slug is not new, fetch the tour detail
            dispatch(getTour(slug, setLoadingTour, setErrorTour));
        }
    }, [dispatch, slug, tour]);

    // has more pages after
    const hasMore = total > currentPage * perPage;

    // call when loadmore button click
    const handleLoadMore = () => {
        if (hasMore) {
            dispatch(getTourList(search, searchParams, currentPage + 1, perPage, newListType, type, setLoading, setError));
        }
    };

    // call when the tournament detail page close
    const handleClose = () => {
        history.push(`${pathname}${search && search}`);
    }

    // open to create new tournament
    const handleClickNew = () => {
        history.push(`${pathname}${search && search}#new`);
    }

    // call end close the error alert, set error to false
    const handleAlertClose = () => {
        setError(false);
    }

    if (slug && !loadingTour && !tour && errorTour) {
        //can't find the tour information, go back to the list
        return <Redirect to={`${pathname}${search && search}`} />;
    }

    return (
        <>
            <SnackAlert open={!!error}
                message="Error when loading data!"
                serverity="error"
                handleClose={handleAlertClose} />
            <Grid container>
                <Grid item xs={12} className={classes.topRow}>
                    Currently showing: {tours.length} of {total} tournaments
                    {
                        type === "mine" ?
                            (<Button variant="contained" color="primary" onClick={handleClickNew}>New Tournament</Button>) : ""
                    }
                </Grid>
                {
                    tours.map(tour => (
                        <Grid item xs={12} sm={6} md={4} key={tour.id} className={classes.listItem}>
                            <TourListItem tour={tour} />
                        </Grid>
                    ))
                }
                {
                    hasMore && (
                        <Grid item xs={12} className={classes.loadMoreRow}>
                            <Button variant="contained" color="primary" onClick={handleLoadMore} disabled={loading}>
                                {loading ? "Loading" : "Load More"}
                            </Button>
                        </Grid>
                    )
                }
            </Grid>
            {(slug && slug === "new") ? <TourAddForm handleClose={handleClose} /> : null}
            {(loadingTour) ? <Loading /> : null}
            {tour ? <Tour tour={tour} handleClose={handleClose} /> : null}
        </>
    );
}

export default TourList;