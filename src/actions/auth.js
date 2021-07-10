import User from "../models/user";
import { AUTH_SET_TOKEN, RESET_ALL } from "../actions/types";
import { clearClockSockets } from "./clock";

/** actions for auth */

function login(username, password, setLoading, setError) {
    return async function (dispatch) {
        dispatch(resetAll());
        clearClockSockets();        // close all socket connections

        setLoading && setLoading(true);

        try {
            const res = await User.login(username, password);

            if (res.token) {
                dispatch(gotToken(res.token));
            }
        } catch (error) {
            setError && setError(error);
        }
        setLoading && setLoading(false);
    }
}

function logout() {
    return async function (dispatch) {
        dispatch(resetAll());
        clearClockSockets();        // close all socket connections
    }
}


function signup(data, setLoading, setError) {
    return async function (dispatch) {
        dispatch(resetAll());
        clearClockSockets();        // close all socket connections

        setLoading && setLoading(true);
        try {
            const res = await User.register(data);

            if (res.token) {
                dispatch(gotToken(res.token));
            }
        } catch (error) {
            if (setError) {
                setError && setError(error);
            }
        }
        setLoading && setLoading(false);
    }
}

function gotToken(token) {
    return {
        type: AUTH_SET_TOKEN,
        payload: token
    };
}

function resetAll() {
    return { type: RESET_ALL };
}

export {
    login,
    logout,
    signup
};