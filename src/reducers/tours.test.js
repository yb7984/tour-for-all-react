import { LOAD_TOUR, LOAD_TOUR_LIST, LOAD_TOUR_WIDGET, REMOVE_TOUR, RESET_TOUR_LIST, RESET_TOUR_WIDGET, RESET_ALL } from '../actions/types';
import reducer from './tours';

const INITIAL_LIST_STATE = {
    tours: [],
    currentPage: 0,
    perPage: 20,
    total: 0,
    listType: "all",
    searchString: "",
    reload:true
};

const INITIAL_WIDGET_STATE = {
    tours: [],
    perPage: 0,
    reload:true
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
const testTour = { id: 1, slug: "test", title: "title" };
const testTour2 = { id: 2, slug: "test2", title: "title2" };

it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
});

it('should handle LOAD_TOUR', () => {
    const state = reducer(undefined, {
        type: LOAD_TOUR,
        payload: testTour
    });
    expect(state.tours["test"]).toEqual(testTour);
});

it('should handle REMOVE_TOUR', () => {
    const state = reducer({
        ...INITIAL_STATE,
        tours: {
            "test": testTour,
            "test2": testTour2
        }
    }, {
        type: REMOVE_TOUR,
        payload: "test"
    });
    expect(state.tours["test"]).toEqual(undefined);
    expect(state).toEqual({
        ...INITIAL_STATE,
        tours: { "test2": testTour2 }
    });
});

it('should handle RESET_ALL', () => {
    let state = reducer(undefined, {
        type: LOAD_TOUR,
        payload: testTour
    });
    expect(state.tours["test"]).toEqual(testTour);

    state = reducer(state, {
        type: RESET_ALL
    });

    expect(state).toEqual(INITIAL_STATE);
});


it('should handle LOAD_TOUR_LIST', () => {
    let state = reducer(INITIAL_STATE, {
        type: LOAD_TOUR_LIST,
        payload: {
            listType: "upcoming",
            searchType: "public",
            searchString: "term=test",
            page: 1,
            perPage: 1,
            total: 2,
            tours: [testTour]
        }
    });
    expect(state.list["public"]).toEqual({
        tours: [testTour],
        currentPage: 1,
        perPage: 1,
        total: 2,
        listType: "upcoming",
        searchString: "term=test",
        reload: false
    });

    // adding new page
    state = reducer(state, {
        type: LOAD_TOUR_LIST,
        payload: {
            listType: "upcoming",
            searchType: "public",
            searchString: "term=test",
            page: 2,
            perPage: 1,
            total: 2,
            tours: [testTour2]
        }
    });
    expect(state.list["public"]).toEqual({
        tours: [testTour, testTour2],
        currentPage: 2,
        perPage: 1,
        total: 2,
        listType: "upcoming",
        searchString: "term=test",
        reload:false
    });

    // change listType, clear list and goback to page 1
    state = reducer(state, {
        type: LOAD_TOUR_LIST,
        payload: {
            listType: "past",
            searchType: "public",
            searchString: "term=test",
            page: 1,
            perPage: 1,
            total: 2,
            tours: [testTour2]
        }
    });
    expect(state.list["public"]).toEqual({
        tours: [testTour2],
        currentPage: 1,
        perPage: 1,
        total: 2,
        listType: "past",
        searchString: "term=test",
        reload:false
    });
});



it('should handle LOAD_TOUR_WIDGET', () => {
    let state = reducer(INITIAL_STATE, {
        type: LOAD_TOUR_WIDGET,
        payload: {
            listType: "upcoming",
            perPage: 1,
            tours: [testTour]
        }
    });
    expect(state.widgets["upcoming"]).toEqual({
        perPage: 1,
        tours: [testTour],
        reload: false
    });
});


it('should handle RESET_TOUR_LIST', () => {
    const state = reducer({
        ...INITIAL_STATE,
        list: {
            ...INITIAL_STATE.list,
            public: {
                tours: [testTour2],
                currentPage: 1,
                perPage: 1,
                total: 2,
                listType: "past",
                searchString: "term=test"
            }
        }
    }, {
        type: RESET_TOUR_LIST
    });
    expect(state.list).toEqual(INITIAL_STATE.list);
});


it('should handle RESET_TOUR_WIDGET', () => {
    const state = reducer({
        ...INITIAL_STATE,
        widgets: {
            ...INITIAL_STATE.widgets,
            upcoming: {
                tours: [testTour2],
                perPage: 1
            }
        }
    }, {
        type: RESET_TOUR_WIDGET
    });
    expect(state.widgets).toEqual(INITIAL_STATE.widgets);
});