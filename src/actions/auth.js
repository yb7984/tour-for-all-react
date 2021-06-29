import User from "../models/user";
import { AUTH_SET_TOKEN, AUTH_RESET } from "../actions/types";

function login(username, password, setLoading, setError) {
    return async function (dispatch) {
        dispatch(reset());
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
        dispatch(reset());
    }
}


function signup(data, setLoading, setError) {
    return async function (dispatch) {
        dispatch(reset());
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

function reset() {
    return { type: AUTH_RESET };
}

export {
    login,
    logout,
    signup
};