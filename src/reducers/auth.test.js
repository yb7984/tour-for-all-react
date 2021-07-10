import { AUTH_SET_TOKEN, RESET_ALL } from '../actions/types';
import reducer from './auth';
import jwt from "jsonwebtoken";

const INITIAL_STATE = {
    token: null,
    username: null,
    role: 0
};

const testToken = jwt.sign({ username: "test", role: 1 }, "test");


it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
});


it('should handle AUTH_SET_TOKEN', () => {
    const state = reducer(undefined, {
        type: AUTH_SET_TOKEN,
        payload: testToken
    });
    expect(state.token).toEqual(testToken);
    expect(state.username).toEqual("test");
    expect(state.role).toEqual(1);
});


it('should handle RESET_ALL', () => {
    let state = reducer(undefined, {
        type: AUTH_SET_TOKEN,
        payload: testToken
    });
    expect(state.token).toEqual(testToken);
    expect(state.username).toEqual("test");
    expect(state.role).toEqual(1);

    state = reducer(state, {
        type: RESET_ALL
    });

    expect(state).toEqual(INITIAL_STATE);
});