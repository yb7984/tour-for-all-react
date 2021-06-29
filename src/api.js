import axios from "axios";
import { store } from "./store";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3002";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class TourForAllAPI {
    // the token for interactive with the API will be stored here.
    static _token = "";

    /**
     * getter of toke, if not available check the localStorage
     */
    static get token() {
        const state = store.getState();

        return state.auth.token;
    }

    /**
     * Make a ajax request and return result data
     * @param {*} endpoint 
     * @param {*} data 
     * @param {*} method 
     * @returns 
     */
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${TourForAllAPI.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    /**
     * Upload file
     * @param {*} data 
     * @returns 
     */
    static async upload(data) {

        try {
            const url = `${BASE_URL}/files`;
            const headers = {
                Authorization: `Bearer ${TourForAllAPI.token}`,
                'Content-Type': 'multipart/form-data'
            };
            const res = await axios.post(
                url,
                data,
                { headers });
            return res.data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    /**
     * Return the real url for an image 
     * @param {*} username 
     * @param {*} url 
     */
    static getImageUrl(image) {
        return `${BASE_URL}${image}`;
    }
}

export default TourForAllAPI;
