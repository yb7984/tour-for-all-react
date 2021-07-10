
/** Data model for clock. */

import TourForAllAPI from "../api";

class Clock {

    tourId;
    levelIndex = 0;
    levels = [];
    entries = 0;
    playersLeft = 0;
    timeLeft = 0;
    stack = 0;

    playing = false;

    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    static formatNumber(number) {
        if (number < 10) {
            return "0" + number;
        }
        return number;
    }

    get showTime() {
        const hours = Math.floor(this.timeLeft / 3600);
        const minutes = Math.floor(this.timeLeft / 60) % 60;
        const seconds = this.timeLeft % 60;
        if (hours > 0) {
            return `${Clock.formatNumber(hours)}:${Clock.formatNumber(minutes)} : ${Clock.formatNumber(seconds)}`;
        }
        return `${Clock.formatNumber(minutes)} : ${Clock.formatNumber(seconds)}`;
    }

    get currentLevel() {
        if (this.levelIndex < this.levels.length) {
            return this.levels[this.levelIndex];
        }
        // return last level defined
        return this.levels[this.levels.length - 1];
    }


    get nextLevel() {
        if (this.levelIndex < this.levels.length - 1) {
            return this.levels[this.levelIndex + 1];
        }
        // return last level defined
        return this.levels[this.levels.length - 1];
    }

    get levelName() {
        if (this.currentLevel.levelType === "break") {
            return "Break";
        }

        let count = 1;
        for (let i = 0; i < this.levelIndex; i++) {
            if (this.currentLevel.levelType !== "break") {
                count++;
            }
        }

        return `Level ${count}`;
    }

    get totalChips() {
        return this.entries * this.stack;
    }
    get averageStack() {
        if (this.playersLeft !== 0) {
            return Math.floor(this.totalChips / this.playersLeft);
        }

        return this.stack;
    }

    forward() {
        this.timeLeft -= 60;
        if (this.timeLeft < 0) {
            this.timeLeft = 0;
        }
    }

    play() {
        this.playing = true;
    }

    tick() {
        if (this.timeLeft > 0) {
            // same level, just decrease the time.
            this.timeLeft--;
        } else {
            //next level
            this.levelIndex++;
            this.timeLeft = this.currentLevel.duration * 60;
        }
    }

    pause() {
        this.playing = false;
    }

    stop() {
        this.playing = false;
    }

    rewind() {
        this.timeLeft += 60;
        if (this.timeLeft > 60 * this.currentLevel.duration) {
            this.timeLeft = 60 * this.currentLevel.duration;
        }
    }

    addPlayer() {
        if (this.playersLeft < this.entries) {
            this.playersLeft++;
        }
    }

    removePlayer() {
        if (this.playersLeft > 0) {
            this.playersLeft--;
        }
    }

    skipPrevious() {
        if (this.levelIndex > 0) {
            this.levelIndex--;
            this.timeLeft = this.currentLevel.duration * 60;
        } else {
            this.timeLeft = this.currentLevel.duration * 60;
        }
    }

    skipNext() {
        this.levelIndex++;
        this.timeLeft = this.currentLevel.duration * 60;
    }

    static getClockSocket(tour) {

        const endpoint = `tours/${tour.id}/clock`;
        return TourForAllAPI.getSocket(endpoint);
    }
}

export default Clock;