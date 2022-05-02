import { createTransform } from 'redux-persist';
import { User } from '../models';

const SetTransform = createTransform(
    // transform state on its way to being serialized and persisted.
    (inboundState, key) => {
        // do nothing
        return inboundState;
    },
    // transform state being rehydrated
    (outboundState, key) => {
        //convert items in users to User
        const users = { ...outboundState };

        Object.keys(users).forEach(username => {
            users[username] = new User(users[username]);
        });

        return users;
    },

    // define which reducers this transform gets called for.
    { whitelist: ['users'] }
);

export default SetTransform;