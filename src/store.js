import  { composeWithDevTools} from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import thunk from "redux-thunk";
import root from "./reducers/root";
import { createStore, applyMiddleware } from "redux";

/** Persist redux store */

const persistConfig = {
  key: "root",          // persist the root reducer
  storage,              // using localStorage
  stateReconciler: autoMergeLevel2  // shallow merges two levels
};

const persistedReducer = persistReducer(persistConfig, root);


export const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(thunk),     // apply thunk
  )
);

export const persistedStore = persistStore(store);