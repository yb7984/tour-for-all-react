import { LOAD_TOUR, LOAD_TOUR_LIST, LOAD_TOUR_WIDGET, REMOVE_TOUR, RESET_TOUR_LIST, RESET_TOUR_WIDGET } from "./types";
import { Tour, TourPlayer } from '../models';
import { store } from "../store";

/** Actions for tours */

function getTour(handle, setLoading, setError) {
    return async function (dispatch) {
        setLoading && setLoading(true);
        try {
            const tour = await Tour.get(handle);
            if (tour) {
                dispatch(gotTour(tour));
            }
        } catch (error) {
            setError && setError(error);
        }
        setLoading && setLoading(false);
    }
}

function getTourList(searchString = "", params = {}, page = 1, perPage = 20, listType = "all", searchType = "public", setLoading, setError) {
    return async function (dispatch) {
        setLoading && setLoading(true);
        try {
            const username = store.getState().auth.username;
            const searchParams = { ...params };
            switch (searchType) {
                case "mine":
                    searchParams["creator"] = username;
                    break;
                case "joined":
                case "favorite":
                    searchParams["username"] = username;
                    searchParams["isActive"] = true;
                    break;
                default:
                    // only get the result with isActive = true
                    searchParams["isActive"] = true;
            }

            const list = await Tour.find(searchParams, page, perPage, ["favorite", "joined"].includes(searchType) ? searchType : listType);

            if (list) {
                dispatch(gotTourList(
                    list,
                    searchString,
                    listType,
                    searchType));
            }
        } catch (error) {
            if (page === 1) {
                // if condition changed and error, store the condition
                dispatch(gotTourList(
                    { tours: [], page: 1, perPage, total: 0 },
                    searchString,
                    listType,
                    searchType));

            }
            setError && setError(error);
        }
        setLoading && setLoading(false);
    }
}


function getTourWidget(params = {}, perPage = 20, listType = "upcoming", setLoading, setError) {
    return async function (dispatch) {
        setLoading && setLoading(true);
        try {
            const list = await Tour.find(params, 1, perPage, listType);

            if (list) {
                dispatch(gotTourWidget(
                    list,
                    listType));
            }
        } catch (error) {
            setError && setError(error);
        }
        setLoading && setLoading(false);
    }
}


function insertTour(data, setLoading, setError) {
    return async function (dispatch) {
        setLoading && setLoading(true);
        setError && setError(null);
        try {
            const tour = await Tour.insert(data);
            if (tour) {
                dispatch(gotTour(tour));
                dispatch(resetTourList());
                dispatch(resetTourWidget());
            }
        } catch (error) {
            setError && setError(error);
        }

        setLoading && setLoading(false);
    }
}

function updateTour(handle, data, setLoading, setError) {
    return async function (dispatch) {
        setLoading && setLoading(true);
        setError && setError(null);
        try {
            const tour = await Tour.update(handle, data);
            if (tour) {
                dispatch(gotTour(tour));
                dispatch(resetTourList());
                dispatch(resetTourWidget());
            }
        } catch (error) {
            setError && setError(error);
        }

        setLoading && setLoading(false);
    }
}

function deleteTour(handle, setLoading, setError) {
    return async function (dispatch) {
        setLoading && setLoading(true);
        setError && setError(null);
        try {
            await Tour.remove(handle);
            dispatch(removeTour(handle));
            dispatch(resetTourList());
            dispatch(resetTourWidget());
        } catch (error) {
            setError && setError(error);
        }

        setLoading && setLoading(false);
    }

}

function joinTour(tourId, username, isJoin, setLoading, setError) {
    return async function (dispatch) {
        setLoading && setLoading(true);
        setError && setError(null);
        try {
            await TourPlayer.joinin(tourId, username, isJoin);

            dispatch(getTour(tourId));
        } catch (error) {
            setError && setError(error);
        }

        setLoading && setLoading(false);
    }
}

function gotTour(tour) {
    return {
        type: LOAD_TOUR,
        payload: tour
    };
}

function gotTourList(list, searchString, listType, searchType) {
    return {
        type: LOAD_TOUR_LIST,
        payload: {
            ...list,
            searchString,
            listType,
            searchType
        }
    };
}

function gotTourWidget(list, listType) {
    return {
        type: LOAD_TOUR_WIDGET,
        payload: {
            ...list,
            listType,
        }
    };
}

function removeTour(handle) {
    return {
        type: REMOVE_TOUR,
        payload: handle
    };
}

function resetTourList() {
    return {
        type: RESET_TOUR_LIST
    };
}

function resetTourWidget() {
    return {
        type: RESET_TOUR_WIDGET
    }
}

export {
    getTour, getTourList, getTourWidget, updateTour,
    insertTour, deleteTour, resetTourList, joinTour
};