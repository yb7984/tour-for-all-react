import { LOAD_TOUR, RESET_ALL, RESET_TOUR_LIST, RESET_TOUR_WIDGET, LOAD_TOUR_LIST, LOAD_TOUR_WIDGET, REMOVE_TOUR } from "../actions/types";

/** reducer for tours */
const INITIAL_LIST_STATE = {
    tours: [],
    currentPage: 0,
    perPage: 20,
    total: 0,
    listType: "all",
    searchString: ""
};

const INITIAL_WIDGET_STATE = {
    tours: [],
    perPage: 0
}

const INITIAL_STATE = {
    tours: {},
    widgets: {
        upcoming: { ...INITIAL_WIDGET_STATE },
        running: { ...INITIAL_WIDGET_STATE },
        past: { ...INITIAL_WIDGET_STATE },
        mine: { ...INITIAL_WIDGET_STATE },
        joined: { ...INITIAL_WIDGET_STATE },
        favorite: { ...INITIAL_WIDGET_STATE },
    },
    list: {
        public: { ...INITIAL_LIST_STATE },
        mine: { ...INITIAL_LIST_STATE },
        favorite: { ...INITIAL_LIST_STATE },
        joined: { ...INITIAL_LIST_STATE },
    }
};


function tours(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RESET_ALL:
            return { ...INITIAL_STATE };
        case RESET_TOUR_LIST:
            return {
                ...state,
                list: {
                    ...INITIAL_STATE.list
                }
            };
        case RESET_TOUR_WIDGET:
            return {
                ...state,
                widgets: {
                    ...INITIAL_STATE.widgets
                }
            };
        case REMOVE_TOUR:
            const { [action.payload]: deleted, ...tours } = state.tours;

            return {
                ...state,
                tours
            };

        case LOAD_TOUR:
            return {
                ...state,
                tours: {
                    ...state.tours,
                    [action.payload.slug]: action.payload
                }
            };

        case LOAD_TOUR_LIST:
            const { listType, searchType, searchString, perPage, total } = action.payload;

            if (state.list[searchType].currentPage === 0 ||
                state.list[searchType].listType !== listType ||
                state.list[searchType].searchString !== searchString) {
                // condition change, reload the whole list
                return {
                    ...state,
                    list: {
                        ...state.list,
                        [searchType]: {
                            tours: action.payload.tours,
                            currentPage: 1,
                            perPage,
                            total,
                            listType,
                            searchString
                        }
                    }
                };
            }
            // otherwise, just add current page data
            return {
                ...state,
                list: {
                    ...state.list,
                    [searchType]: {
                        ...state.list[searchType],
                        tours: [
                            ...state.list[searchType].tours,
                            ...action.payload.tours
                        ],
                        currentPage: state.list[searchType].currentPage + 1
                    }
                }
            };
        case LOAD_TOUR_WIDGET:
            return {
                ...state,
                widgets: {
                    ...state.widgets,
                    [action.payload.listType]: {
                        tours: action.payload.tours,
                        perPage: action.payload.perPage
                    }
                }
            };
        default:
            return state;
    }
}

export default tours;