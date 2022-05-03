import { TourListWidget } from "../Tour/List";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getTour } from "../../actions/tours";
import { useState, useEffect } from "react";
import { useQueryParams } from "../../hooks";
import { Loading } from "../common";
import { Tour } from "../Tour/Detail";

const HomePage = (props) => {
    const { username, tours, getTour } = props

    const history = useHistory();
    const [loadingTour, setLoadingTour] = useState(false);
    const [error, setError] = useState(false);

    const { hash } = useQueryParams();
    const slug = hash ? hash.substr(1) : null;
    const tour = tours[slug];

    useEffect(() => {
        getTour(slug, tour, setLoadingTour, setError);
    }, [slug, tour, getTour]);


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

const mapStateToProps = (state) => ({
    username: state.auth.username,
    tours: state.tours.tours
});

const mapDispatchToProps = (dispatch) => {
    return {
        getTour: (slug, tour, setLoading, setError) => {
            if (slug && !tour) {
                dispatch(getTour(slug, setLoading, setError));
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
