import TourListWidget from "./TourListWidget";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getTour } from "./actions/tours";
import { useState, useEffect } from "react";
import useQueryParams from "./hooks/useQueryParams";
import Loading from "./Loading";
import Tour from "./Tour";

const HomePage = () => {
    const username = useSelector(st => st.auth.username);

    const history = useHistory();
    const dispatch = useDispatch();
    const [loadingTour, setLoadingTour] = useState(false);
    const [error, setError] = useState(false);

    const { hash } = useQueryParams();
    const slug = hash ? hash.substr(1) : null;
    const tour = useSelector(st => st.tours.tours[slug]);

    useEffect(() => {
        if (slug && !tour) {
            dispatch(getTour(slug, setLoadingTour, setError));
        }
    }, [dispatch, slug, tour]);


    const handleClose = () => {
        history.push("/");
    }


    if (slug && !loadingTour && !tour && error) {
        //can't find the tour information, go back to the list
        return <Redirect to="/" />;
    }

    return (<div>
        {username && <TourListWidget listType="joined" perPage={3} />}
        <TourListWidget listType="running" perPage={username ? 3 : 6} />
        {username && <TourListWidget listType="favorite" perPage={3} />}
        <TourListWidget listType="upcoming" perPage={username ? 3 : 6} />
        {(loadingTour) && <Loading />}
        {tour ? <Tour tour={tour} handleClose={handleClose} /> : ""}
    </div>);
}

export default HomePage;