const {
    TOUR_STATUS_PRIVATE
} = require('./tourStatus');


/** Data model for tours. */
class Tour {
    id;
    slug;
    title;
    image = "";
    guaranteed = 0;
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
        return this.image;
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
    }
}

export default Tour;