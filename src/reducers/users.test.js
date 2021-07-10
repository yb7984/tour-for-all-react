import { LOAD_USER, RESET_ALL } from '../actions/types';
import reducer from './users';

const INITIAL_STATE = {
};

const testUser = { username: "test", firstName: "testf" };

it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
});

it('should handle LOAD_USER', () => {
    const state = reducer(undefined, {
        type: LOAD_USER,
        payload: testUser
    });
    expect(state["test"]).toEqual(testUser);
});


it('should handle RESET_ALL', () => {
    let state = reducer(undefined, {
        type: LOAD_USER,
        payload: testUser
    });
    expect(state["test"]).toEqual(testUser);

    state = reducer(state, {
        type: RESET_ALL
    });

    expect(state).toEqual(INITIAL_STATE);
});