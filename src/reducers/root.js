import { combineReducers } from "redux";
import auth from "./auth";
import tours from "./tours";
import users from "./users";

/** root reducer */

export default combineReducers({
    auth,
    users,
    tours
});