import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import auth from "./auth";
import tours from "./tours";
import users from "./users";
import clocks from "./clocks";
import storage from "redux-persist/lib/storage";
import ToursTransform from '../transforms/tours';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

/** root reducer */

const toursPersistConfig = {
    key: "tours",
    storage: storage,
    stateReconciler: autoMergeLevel2,  // shallow merges two levels
    whitelist: ["tours"],           // not persist list information
    transforms: [ToursTransform]
};


export default combineReducers({
    auth,
    users,
    tours: persistReducer(toursPersistConfig, tours),
    clocks
});