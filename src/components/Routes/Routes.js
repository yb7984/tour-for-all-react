import React from "react";
import { Switch, Route } from "react-router-dom";
import { HomePage, Login, Signup, Profile, Tours, MyTours, MyJoined, MyFavorites } from "../Routes";


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
