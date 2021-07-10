import { LOAD_CLOCK, REMOVE_CLOCK, RESET_ALL } from "../actions/types";

/** reducer for clocks */

const INITIAL_STATE = {
};


function clocks(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RESET_ALL:
            return { ...INITIAL_STATE };
        case LOAD_CLOCK:
            return {
                ...state,
                [action.payload.tourId]: action.payload
            };
        case REMOVE_CLOCK:
            const { [action.payload]: deleted, ...clocks } = state;
            return clocks;
        default:
            return state;
    }
}

export default clocks;