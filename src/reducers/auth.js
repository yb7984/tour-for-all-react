import { AUTH_SET_TOKEN, RESET_ALL } from "../actions/types";
import { ROLE_USER } from "../models/role";
import jwt from "jsonwebtoken";

/** reducer for tours */

const INITIAL_STATE = {
    token: null,
    username: null,
    role: ROLE_USER
};


function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RESET_ALL:
            return { ...INITIAL_STATE };
        case AUTH_SET_TOKEN:
            const token = action.payload;
            const { username, role } = jwt.decode(token);
            return {
                token,
                username,
                role
            };
        default:
            return state;
    }
}

export default auth;