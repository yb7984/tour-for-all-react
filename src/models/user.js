import { ROLE_USER } from './role';
import TourForAllAPI from "../api";
import defaultImage from "../images/avatar.png";


/** Data model for users. */
class User {
    username;
    password = "";
    firstName = "";
    lastName = "";
    email = "";
    phone = "";
    image = "";
    role = ROLE_USER;
    updated = null;
    created = null;
    isActive = true;

    followers = [];
    followings = [];

    followingTours = [];

    tours = {};

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    get imageUrl() {
        if (this.image.length > 0) {
            return TourForAllAPI.getImageUrl(this.image);
        }
        return defaultImage;
    }

    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    /**
     * Login and return token
     * @param {*} username 
     * @param {*} password 
     * @returns token
     */
    static async login(username, password) {
        return await TourForAllAPI.request(
            `auth/token`,
            { username, password },
            "post");
    }

    static async register(data) {
        return await TourForAllAPI.request(
            `auth/register`,
            data,
            "post"
        );
    }

    /**
     * Return detail information a User
     * @param {*} username 
     * @returns User
     */
    static async get(username) {
        const res = await TourForAllAPI.request(`users/${username}`);

        if (res.user) {
            return new User(res.user);
        }
        return null;
    }

    /** Update user data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain
     * all the fields; this only changes provided ones.
     *
     * @param {String} username
     * @param {Object} data
     * Data can include:
     *         { firstName, lastName, password, email, phone , image , role , isActive}
     *
     * @returns User
     */
    static async update(username, data) {

        delete data.username;
        if (!data.password) {
            delete data.password;
        }

        const res = await TourForAllAPI.request(
            `users/${username}`,
            data,
            "patch");

        if (res.user) {
            return new User(res.user);
        }
        return null;
    }

    /**
     * Follow or Defollow a tournament
     * @param {String} username
     * @param {Integer} tourId 
     * @param {Boolean} isFollow 
     * @returns tourId
     */
    static async followTour(username, tourId, isFollow = true) {
        const res = await TourForAllAPI.request(
            `tours/${tourId}/follow/${username}`,
            {},
            isFollow ? "post" : "delete");

        return res;
    }
}

export default User;
