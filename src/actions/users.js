
import User from '../models/user';
import { LOAD_USER } from "./types";

/** Actions for users */

function getUser(username, setLoading, setError) {
    return async function (dispatch) {
        setLoading && setLoading(true);
        try {
            const user = await User.get(username);
            if (user) {
                dispatch(gotUser(user));
            }
        } catch (error) {
            setError && setError(error);
        }

        setLoading && setLoading(false);
    }
}

function updateUser(username, data, setLoading, setError) {
    return async function (dispatch) {
        setLoading && setLoading(true);
        setError && setError(null);
        try {
            const user = await User.update(username, data);
            if (user) {
                dispatch(gotUser(user));
            }
        } catch (error) {
            setError && setError(error);
        }

        setLoading && setLoading(false);
    }
}

function followTour(username, tourId, isFollow, setLoading, setError) {
    return async function (dispatch) {
        setLoading && setLoading(true);
        setError && setError(null);
        try {
            await User.followTour(username, tourId, isFollow);
            const user = await User.get(username);  //retrieve the user data
            if (user) {
                dispatch(gotUser(user));
            }
        } catch (error) {
            setError && setError(error);
        }

        setLoading && setLoading(false);
    }

}

function gotUser(user) {
    return {
        type: LOAD_USER,
        payload: user
    }
}

export { getUser, updateUser, followTour };