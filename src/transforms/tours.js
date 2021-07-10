import { createTransform } from 'redux-persist';
import Tour from '../models/tour';

const SetTransform = createTransform(
    // transform state on its way to being serialized and persisted.
    (inboundState, key) => {
        // do nothing
        return inboundState;
    },
    // transform state being rehydrated
    (outboundState, key) => {
        //convert items in tours to Tour
        const tours = { ...outboundState };

        Object.keys(tours).forEach(slug => {
            tours[slug] = new Tour(tours[slug]);
        });

        return tours;

        // const newList = {};
        // const newWidgets = {};

        // Object.keys(outboundState.list).forEach(type => {

        //     newList[type] = {
        //         ...outboundState.list[type],
        //         tours: [...outboundState.list[type].tours]
        //     };
        //     newList[type].tours = newList[type].tours.map(tour => (new Tour(tour)));
        // });


        // Object.keys(outboundState.widgets).forEach(type => {
        //     newWidgets[type] = {
        //         ...outboundState.widgets[type],
        //         tours: [...outboundState.widgets[type].tours]
        //     };
        //     newWidgets[type].tours = newWidgets[type].tours.map(tour => (new Tour(tour)));
        // });

        // return {
        //     tours,
        //     list: newList,
        //     widgets: newWidgets
        // };
    },

    // define which reducers this transform gets called for.
    { whitelist: ['tours'] }
);

export default SetTransform;