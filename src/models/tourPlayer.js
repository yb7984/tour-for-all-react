import TourForAllAPI from "../api";

/** Data model for tours_players. */

class TourPlayer {
    tourId;
    username;
    signupTime;
    place = 0;
    prize = "";

    constructor(obj) {
        obj && Object.assign(this, obj);
    }


    /**
     * Join in or quit a tournament
     * @param {Integer} tourId
     * @param {String} username
     * @param {Boolean} isJoin
     * @returns TourPlayer
     */
    static async joinin(tourId, username, isJoin) {
        const res = await TourForAllAPI.request(
            `tours/${tourId}/players/${username}`,
            {},
            isJoin ? "post" : "delete");

        if (res.player) {
            return new TourPlayer(res.player);
        }
        return null;
    }


    /** Update player data with `data`.
     *
     * @param {Integer} tourId
     * @param {String} username
     * @param {Object} data
     * Data can include:
     *         {place, prize}
     *
     * @returns TourPlayer
     */
    static async update(tourId, username, data) {
        const res = await TourForAllAPI.request(
            `tours/${tourId}/players/${username}`,
            data,
            "patch");

        if (res.player) {
            return new TourPlayer(res.player);
        }
        return null;
    }
}

export default TourPlayer;