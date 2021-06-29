import { LOAD_TOUR, RESET_ALL } from "../actions/types";

/** reducer for tours */

const INITIAL_STATE = {};


function tours(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RESET_ALL:
            return { ...INITIAL_STATE };

        case LOAD_TOUR:
            return {
                ...state,
                [action.payload.slug]: { ...action.payload }
            };

        default:
            return state;
    }
}

export default tours;