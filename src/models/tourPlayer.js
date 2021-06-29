
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
}

export default TourPlayer;