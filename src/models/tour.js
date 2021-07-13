import TourForAllAPI from '../api';
import defaultImage from "../images/pokertour1.jpeg";
import TourPlayer from './tourPlayer';
import { v4 as uuid } from 'uuid';

const {
    TOUR_STATUS_PRIVATE, statusName
} = require('./tourStatus');


/** Data model for tours. */
class Tour {
    id;
    slug;
    title;
    image = "";
    guaranteed = 0;
    stack = 10000;
    description = "";
    creator;
    price = 0;
    entryFee = 0;
    start = null;
    setting = "";
    clockSetting = "";
    status = TOUR_STATUS_PRIVATE;
    startTime = null;
    endTime = null;
    isActive = true;

    players = {};


    get imageUrl() {
        if (this.image.length > 0) {
            return TourForAllAPI.getImageUrl(this.image);
        }
        return defaultImage;
    }

    get statusName() {
        return statusName(this.status);
    }

    getSetting(key) {
        if (!this.setting) {
            return null;
        }
        const data = JSON.parse(this.setting);

        return data[key];
    }

    constructor(obj) {
        obj && Object.assign(this, obj);

        if (typeof this.start === "string") {
            this.start = new Date(this.start);
        }
        if (typeof this.startTime === "string") {
            this.startTime = new Date(this.startTime);
        }
        if (typeof this.endTime === "string") {
            this.endTime = new Date(this.endTime);
        }

        if (this.setting === "") {
            this.setting = JSON.stringify({
                defaultDuration: 20,
                defaultBreakDuration: 10,
                levels: [{
                    id: uuid(),
                    levelType: "play",
                    bigBlind: 25,
                    smallBlind: 25,
                    ante: 0,
                    bigBlindAnte: 0,
                    duration: 20
                }]
            });
        }
    }


    /**
     * Generate a slug
     * @param {Tour} tour 
     * @returns slug
     */
    static generateSlug(tour) {
        return tour.start.toISOString().substr(0, 10) + "-" +
            tour.title.trim().toLowerCase().replace(/\W/g, '-').substr(0, 30) + "-" +
            (Date.now() % 10000);
    }


    /**s
     * Find tours.
     * @param {Object} params
     * @param {Integer} page
     * @param {Integer} perPage
     * @param {string} listType could be one of these all,upcoming,past,runing,canceled
     * @returns {tours:[Tour,...] , total , perPage, page}
     */
    static async find(params = {}, page = 1, perPage = 20, listType = "all") {

        Object.keys(params).forEach((key) => {
            if (params[key] === null || params[key] === "") {
                delete params[key];
            }
        });
        delete params["listType"];

        const res = await TourForAllAPI.request(
            `tours`,
            {
                ...params,
                page,
                perPage,
                listType
            });

        if (res.tours) {
            return {
                ...res,
                tours: res.tours.map(tour => (new Tour(tour)))
            };
        }

        return null;
    }

    /**
     * Given a tour handle, return data about tour.
     * Throws NotFoundError if tour not found.
     * @param {*} handle can be tour id or tour slug
     * @returns Tour
     */
    static async get(handle) {
        const res = await TourForAllAPI.request(
            `tours/${handle}`
        );

        if (res.tour) {
            const tour = new Tour(res.tour);

            for (const username of Object.keys(tour.players)) {
                tour.players[username] = new TourPlayer(tour.players[username]);
            }
            return tour;
        }
        return null;
    }


    /**
     * Create a new tour with data.
     * @param {*} data
     * @returns Tour
     */
    static async insert(data) {
        const res = await TourForAllAPI.request(
            `tours`,
            data,
            "post"
        );

        if (res.tour) {
            return new Tour(res.tour);
        }

        return null;
    }


    /** Update tour data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain
     * all the fields; this only changes provided ones.
     *
     * @param {*} handle could be id or slug
     * @param {Object} data
     * Data can include:
     *         { slug, title, image, guaranteed, description,
                    creator, price, entryFee, start, setting,clockSetting,
                    status,startTime,endTime, isActive,}
     *
     * @returns Tour
     */
    static async update(handle, data) {

        const res = await TourForAllAPI.request(
            `tours/${handle}`,
            data,
            "patch"
        );

        if (res.tour) {
            return new Tour(res.tour);
        }

        return null;
    }


    /**
     * Delete given tour from database; returns undefined.
     * @param {*} handle 
     */
    static async remove(handle) {
        return await TourForAllAPI.request(
            `tours/${handle}`,
            {},
            "delete"
        );
    }
}
export default Tour;