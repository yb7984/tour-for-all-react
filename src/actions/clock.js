import { LOAD_CLOCK, REMOVE_CLOCK } from "../actions/types";
import Clock from "../models/clock";
import { TOUR_STATUS_ENDED, TOUR_STATUS_PUBLIC, TOUR_STATUS_STARTED } from "../models/tourStatus";
import { getTour, updateTour } from "./tours";
import { store } from "../store";
import { v4 as uuid } from "uuid";

// TIMERS
const TIMERS = new Map();
// Map for storing the clock sockets
const CLOCKS_SOCKETS = new Map();

/** actions for clocks */

/**
 * Close all the socket connections and clear
 */
function clearClockSockets() {
    CLOCKS_SOCKETS.forEach((ws, tourId) => {
        ws.close();
    });

    CLOCKS_SOCKETS.clear();
}

function removeClockSocket(tourId) {
    if (CLOCKS_SOCKETS.has(tourId)) {
        CLOCKS_SOCKETS.get(tourId).close();
        CLOCKS_SOCKETS.delete(tourId);
    }
}

/**
 * Return the socket connection by tour, if not connected, create a new one
 * @param {*} tour 
 * @param {*} dispatch 
 * @returns 
 */
function getClockSocket(tour, dispatch) {
    if (!CLOCKS_SOCKETS.has(tour.id) ||
        ![0, 1].includes(CLOCKS_SOCKETS.get(tour.id).readyState)) {
        // not connected or the readystate is not connecting and not ready, reconnect

        const ws = Clock.getClockSocket(tour);
        const state = store.getState();
        const username = state.auth.username;
        const user = username ? state.users[username] : null;

        /** called when connection opens, sends join info to server. */
        ws.onopen = function (evt) {
            console.log("open", evt);


            let data = user ? {
                type: "join",
                name: username,
                clockManager: tour.creator === username
            } :
                { type: "join", name: uuid(), clockManager: false };    // if not login just use a unique random name

            ws.send(JSON.stringify(data));

            if (tour.creator === username) {
                // if this is clock manager, send current clock
                const clock = state.clocks[tour.id];

                if (clock) {
                    sendClock(tour, clock, dispatch);
                }
            }
        };


        ws.onmessage = function (evt) {

            if (evt.data.startsWith("tour_updated_")) {
                //got notification of tour informations has been updated, update the tour
                dispatch(getTour(tour.id));

                return;
            }
            if ([TOUR_STATUS_PUBLIC, TOUR_STATUS_STARTED, TOUR_STATUS_ENDED].includes(tour.status)) {
                if (tour.creator !== username) {
                    // if not the clock manager, get the sync message, update the clock status
                    const newClock = new Clock(JSON.parse(evt.data));
                    newClock.levels = tour.getSetting("levels");

                    if (newClock.playing) {
                        dispatch(tourClockPlay(tour, newClock, false));
                    } else {
                        dispatch(tourClockPause(tour, newClock, false));
                    }
                } else {
                    // for clock manager, when somebody else joined, send out the current clock.
                    if (evt.data === "join") {
                        // new member joined, send the clock information
                        const state = store.getState();

                        ws.send(JSON.stringify({ type: "sync", data: state.clocks[tour.id] }));
                    }
                }
            }
        };

        /** called on error; logs it. */
        ws.onerror = function (evt) {
            console.error(`err ${evt}`);
        };


        /** called on connection-closed; logs it. */
        ws.onclose = function (evt) {
            console.log("close", evt);
        };

        CLOCKS_SOCKETS.set(tour.id, ws);    // save to a map
    }

    // return the socket connection from map
    return CLOCKS_SOCKETS.get(tour.id);
}

function connectClockSocket(tour) {
    return async function (dispatch) {
        getClockSocket(tour, dispatch);
    }
}

function loadClock(tour) {
    return async function (dispatch) {

        const levels = tour.getSetting("levels");
        const entries = Object.keys(tour.players).length;
        const timeLeft = levels && levels[0].duration * 60;
        const clock = new Clock({
            tourId: tour.id,
            entries,
            playersLeft: entries,
            levels,
            stack: tour.stack,
            timeLeft
        });

        dispatch(gotClock(clock));
    }
}

function removeClock(tour) {
    return async function (dispatch) {
        clearTimer(tour.id);
        removeClockSocket(tour.id);
        dispatch({ type: REMOVE_CLOCK, payload: tour.id });
    }
}


function tourClockPlay(tour, clock, canEdit) {
    return async function (dispatch) {

        if (tour.status !== TOUR_STATUS_STARTED && canEdit) {
            //update the tour status
            dispatch(updateTour(tour.id, { status: TOUR_STATUS_STARTED }));
        }

        await tourClockAction(dispatch, tour, clock, "play", canEdit);
    }
}


function tourClockPause(tour, clock, canEdit) {
    return async function (dispatch) {
        await tourClockAction(dispatch, tour, clock, "pause", canEdit);
    }
}

function tourClockForward(tour, clock, canEdit) {
    return async function (dispatch) {
        await tourClockAction(dispatch, tour, clock, "forward", canEdit);
    }
}

function tourClockRewind(tour, clock, canEdit) {
    return async function (dispatch) {
        await tourClockAction(dispatch, tour, clock, "rewind", canEdit);
    }
}
function tourClockSkipNext(tour, clock, canEdit) {
    return async function (dispatch) {
        await tourClockAction(dispatch, tour, clock, "skipNext", canEdit);
    }
}
function tourClockSkipPrevious(tour, clock, canEdit) {
    return async function (dispatch) {
        await tourClockAction(dispatch, tour, clock, "skipPrevious", canEdit);
    }
}
function tourClockAddPlayer(tour, clock, canEdit) {
    return async function (dispatch) {
        await tourClockAction(dispatch, tour, clock, "addPlayer", canEdit);
    }
}
function tourClockRemovePlayer(tour, clock, canEdit) {
    return async function (dispatch) {
        await tourClockAction(dispatch, tour, clock, "removePlayer", canEdit);
    }
}
function tourClockStop(tour, clock, canEdit) {
    return async function (dispatch) {
        await tourClockAction(dispatch, tour, clock, "stop", canEdit);
        // update the tour status to ended
        canEdit && dispatch(updateTour(tour.id, { status: TOUR_STATUS_ENDED }));
    }
}

async function tourClockAction(dispatch, tour, clock, action, canEdit) {
    const newClock = new Clock(clock);  // get a copy of the clock

    newClock[action]();     // do the action

    setClock(tour, newClock, dispatch, canEdit);

    canEdit && sendClock(tour, newClock, dispatch);

    canEdit && updateClock(tour, newClock, dispatch);
}

function updateClock(tour, clock, dispatch) {
    dispatch(updateTour(tour.id, { clockSetting: JSON.stringify(clock) }));
}

function sendClock(tour, clock, dispatch) {
    const ws = getClockSocket(tour, dispatch);
    if (ws && ws.readyState === 1) {
        const { levels: deleted, ...data } = clock;    //remove levels to minimize the data transfer.

        const sendData = {
            type: "sync",
            data
        }
        ws.send(JSON.stringify(sendData));
    }
}

function clearTimer(tourId) {
    if (TIMERS.has(tourId)) {
        // if clock is running, clear the interval
        clearInterval(TIMERS.get(tourId));
        TIMERS.delete(tourId);
    }
}

function setClock(tour, clock, dispatch, canEdit) {
    function tickClock() {
        clock.tick();

        const newClock = new Clock(clock);

        dispatch(gotClock(newClock));

        if (newClock.timeLeft % 60 === 0) {
            canEdit && sendClock(tour, newClock, dispatch);   //send the sync infomation from the clock manager every minute
        }
    }

    clearTimer(clock.tourId);

    if (clock.playing) {
        // restart the clock
        TIMERS.set(clock.tourId, setInterval(tickClock, 1000));

    } else {
        // otherwise just commit the change
        dispatch(gotClock(clock));
    }

}

function gotClock(clock) {
    return {
        type: LOAD_CLOCK,
        payload: clock
    };
}


export {
    connectClockSocket, getClockSocket, clearClockSockets,
    loadClock, removeClock, tourClockPlay, tourClockPause,
    tourClockForward, tourClockRewind, tourClockSkipNext, tourClockSkipPrevious,
    tourClockAddPlayer, tourClockRemovePlayer, tourClockStop, gotClock
};