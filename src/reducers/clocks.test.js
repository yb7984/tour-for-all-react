import { LOAD_CLOCK, REMOVE_CLOCK, RESET_ALL } from '../actions/types';
import reducer from './clocks';

const INITIAL_STATE = {
};

const testClock = { tourId: 1, currentLevel: 2 };

it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
});

it('should handle LOAD_CLOCK', () => {
    const state = reducer(undefined, {
        type: LOAD_CLOCK,
        payload: testClock
    });
    expect(state[1]).toEqual(testClock);
});

it('should handle REMOVE_CLOCK', () => {
    let state = reducer(undefined, {
        type: LOAD_CLOCK,
        payload: testClock
    });
    expect(state[1]).toEqual(testClock);

    state = reducer(state , {
        type:REMOVE_CLOCK, 
        payload:1
    });

    expect(state[1]).toEqual(undefined);
});

it('should handle RESET_ALL', () => {
    let state = reducer(undefined, {
        type: LOAD_CLOCK,
        payload: testClock
    });
    expect(state[1]).toEqual(testClock);

    state = reducer(state, {
        type: RESET_ALL
    });

    expect(state).toEqual(INITIAL_STATE);
});