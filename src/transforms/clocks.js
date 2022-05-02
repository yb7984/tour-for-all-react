import { createTransform } from 'redux-persist';
import { Clock } from '../models';

const SetTransform = createTransform(
    // transform state on its way to being serialized and persisted.
    (inboundState, key) => {
        // do nothing
        return inboundState;
    },
    // transform state being rehydrated
    (outboundState, key) => {
        //convert items in clocks to Clock
        const clocks = { ...outboundState };

        Object.keys(clocks).forEach(tourId => {
            clocks[tourId] = new Clock(clocks[tourId]);
        });

        return clocks;
    },

    // define which reducers this transform gets called for.
    { whitelist: ['clocks'] }
);

export default SetTransform;