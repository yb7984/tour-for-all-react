import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Tours from "./Tours";
import MyTours from "./MyTours";
import MyJoined from "./MyJoined";
import MyFavorites from "./MyFavorites";

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
            <Route path="/tours">
                <Tours />
            </Route>
            <Route path="/mytours">
                <MyTours />
            </Route>
            <Route path="/myjoined">
                <MyJoined />
            </Route>
            <Route path="/myfavorites">
                <MyFavorites />
            </Route>
        </Switch>
    );
}

export default Routes;
