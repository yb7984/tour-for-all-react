import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";

function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>
        </Switch>
    );
}

export default Routes;
