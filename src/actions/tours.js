import { LOAD_TOUR } from "./types";
import Tour from '../models/tour';

function getTour(handle) {
    return async function (dispatch) {
        const tour = await Tour.get(handle);
        if (tour) {
            dispatch(gotTour(tour));
        }
    }
}

function gotTour(tour) {
    return {
        type: LOAD_TOUR,
        payload: tour
    }
}

export { getTour };