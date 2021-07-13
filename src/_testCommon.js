"use strict";
import { render as originRender } from '@testing-library/react';
import jwt from "jsonwebtoken";

import '@fontsource/roboto';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import { Provider } from "react-redux";
import { store } from "./store";
import '@fontsource/roboto';
import User from './models/user';
import Tour from './models/tour';
import { ROLE_ADMIN, ROLE_USER } from './models/role';
import { TOUR_STATUS_PUBLIC } from '../../tour-for-all-express/models/tourStatus';

/**
 * return signed JWT from user data.
 * @param {Object} user 
 * @returns token
 */
function createToken(user) {
    console.assert(user.role !== undefined,
        "createToken passed user without role property");

    let payload = {
        username: user.username,
        role: user.role || ROLE_USER,
    };

    return jwt.sign(payload, "SECRET_KEY");
}


export function render(child) {
    return originRender(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {child}
            </ThemeProvider>
        </Provider>
    );
}

export const u1 = new User({
    username: "u1",
    password: 'password1',
    firstName: "U1F",
    lastName: "U1L",
    email: "u1@email.com",
    role: ROLE_ADMIN,
    isActive: true
});
export const u2 = new User({
    username: "u2",
    password: 'password2',
    firstName: "U2F",
    lastName: "U2L",
    email: "u2@email.com",
    role: ROLE_USER,
    isActive: true
});
export const t1 = new Tour({
    title: "t-1",
    creator: "u1",
    price: 10,
    entryFee: 2,
    start: new Date(Date.now() + 24 * 60 * 60 * 1000),
    status: TOUR_STATUS_PUBLIC,
    isActive: true
});
export const t2 = new Tour({
    title: "t-2",
    creator: "u2",
    price: 100,
    entryFee: 0,
    start: new Date(Date.now() - 4 * 60 * 60 * 1000),
    status: TOUR_STATUS_PUBLIC,
    isActive: true
});


export const u1Token = createToken({ username: "u1", role: ROLE_ADMIN });
export const u2Token = createToken({ username: "u2", role: ROLE_USER });