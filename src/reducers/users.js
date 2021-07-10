import { LOAD_USER, RESET_ALL } from "../actions/types";

/** reducer for users */

const INITIAL_STATE = {};


function users(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RESET_ALL:
            return { ...INITIAL_STATE };

        case LOAD_USER:
            return {
                ...state,
                [action.payload.username]: action.payload
            };

        default:
            return state;
    }
}

export default users;